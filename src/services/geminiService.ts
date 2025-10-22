import { GoogleGenAI, Type } from "@google/genai";
import type { AgencyInputData, TeamStructureResponse } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    departments: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          department: { type: Type.STRING },
          team: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                role: { type: Type.STRING },
                count: { type: Type.INTEGER },
              },
              required: ['role', 'count'],
            },
          },
          justification: { type: Type.STRING },
        },
        required: ['department', 'team', 'justification'],
      },
    },
  },
  required: ['departments'],
};

function buildPrompt(data: AgencyInputData): string {
  const departmentDetails = data.departments
    .map(
      (d) =>
        `- **${d.name}:** ${d.jobsPercentage}% de envolvimento, ${d.complexityPercentage}% de complexidade.`
    )
    .join('\n');

  const considerationsText = data.considerations
    ? `\n**Considerações Adicionais:**\n${data.considerations}`
    : '';

  return `
    Você é um diretor de operações especialista em uma agência de publicidade de ponta. Sua tarefa é analisar os dados de carga de trabalho de um novo cliente e recomendar uma estrutura de equipe ideal.

    **Contexto:**
    A agência precisa montar uma equipe para um cliente com a seguinte carga de trabalho mensal:
    - **Total de Jobs por Mês:** ${data.totalJobs}
    ${considerationsText}

    **Detalhes por Departamento:**
    ${departmentDetails}

    **Sua Tarefa:**
    Com base nesses dados, forneça uma estrutura de equipe recomendada. Para cada departamento, especifique o número de profissionais e seus níveis de senioridade (ex: Júnior, Pleno, Sênior, Diretor/Líder).

    **Regras de Raciocínio:**
    1.  Maior volume de jobs exige mais pessoas.
    2.  Maior porcentagem de complexidade exige mais profissionais Sênior ou um Líder para supervisão.
    3.  Uma complexidade baixa pode ser gerenciada por profissionais Júnior e Pleno.
    4.  Ajuste a quantidade de pessoas com base na porcentagem de envolvimento do departamento. Um departamento com 100% de envolvimento em muitos jobs precisará de uma equipe maior do que um com 20%.
    5.  Seja realista. Equipes muito pequenas podem não dar conta do volume, e equipes muito grandes podem ser ineficientes.

    Forneça sua resposta **APENAS** em formato JSON válido, seguindo o schema especificado. Não inclua markdown (como \`\`\`json) ou qualquer texto fora do objeto JSON.
  `;
}

export const estimateTeam = async (data: AgencyInputData): Promise<TeamStructureResponse> => {
  try {
    const prompt = buildPrompt(data);

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: responseSchema,
            temperature: 0.5,
        }
    });
    
    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    return result as TeamStructureResponse;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get team estimation from Gemini API.");
  }
};