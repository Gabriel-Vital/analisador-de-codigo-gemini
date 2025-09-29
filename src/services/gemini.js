import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiClient = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY)

export async function analyzeCode(code) {
  const prompt = `
    Analise o seguinte código e forneça sugestões de melhorias de forma didática e clara: 

    ${code}

    Por favor, avalie:
    1. Possiveis bugs ou erros
    2. Melhorias de performance
    3. Boas particas de código
    4.clegibilidade e manutenibilidade
    5. Sugestões especificas de otimização
    
    IMPORTANTE:
    - Formate a resposta usando markdown
    - Use ### para títulos das seções
    - Use **negrito** para destacar pontos imortantes
    - Use \`código\` para trechos de código
    - Use - para listas
    - Seja Claro e didático em português
    
    FORMATO DA RESPOSTA: 
    - Use apenas parágrafos normais
    - Seja CONCISO. Retore apenas:

    ❌ PRINCIPAL PROBLEMA:

    ✅ SOLUÇÃO RÁPIDA:

    Máximo 3 frases. Direto ao ponto.`;

    try {
      const model = geminiClient.getGenerativeModel({model: "gemini-2.5-flash"})

      const result = await model.generateContent(prompt)
      
      const response = await result.response

      return response.text();
    } catch (error) {
      console.error("Erro ao análisar código", error)
      throw new Error("Erro ao conectar com a IA. Verifique sua chave API e tente novamente")
    }
}