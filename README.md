# Consulta Legal

Projeto web completo para **consultas de CNPJ e Notas Fiscais Eletrônicas (NF-e)**, desenvolvido com foco em usabilidade, validações client-side e integração com APIs públicas e privadas.

## Funcionalidades

- 🔍 Consulta de **CNPJ** com validação e formatação em tempo real.
- 📄 Geração de **DANFe em PDF** a partir de um arquivo XML.
- 📥 Download do **XML da nota fiscal** usando o código de acesso.
- 📥 Download do **DANFe em PDF** usando o código de acesso.
- ✅ Validação e formatação do **CNPJ** e **código de acesso da nota fiscal**.
- 🧠 Integração com **API própria em Spring Boot + PostgreSQL** para armazenar e reutilizar dados de CNPJs consultados.
- 💾 Uso de `localStorage` para persistência temporária de dados consultados.

## 🛠️ Tecnologias Utilizadas

### Front-end
- HTML5
- CSS3
- JavaScript

### Back-end
- Java com Spring Boot
- Banco de dados PostgreSQL
- Integração com:
  - **API própria Spring Boot** – Consulta dados de CNPJ com cache inteligente para evitar chamadas desnecessárias à API pública.
  - [API CNPJá](https://cnpja.com.br) para CNPJ e NF-e (PDF e XML)
  - [API MeuDanfe](https://meudanfe.com/) para conversão de XML → PDF

## 📁 Estrutura de Diretórios

```
consulta-legal/
│
├── index.html # Página inicial
├── consulta-cnpj.html # Página de exibição dos dados do CNPJ
├── consulta-nota.html # Página de consulta de nota fiscal
├── style.css # Estilos gerais
├── script.js # Lógica JS (validações, requisições, etc)
└── README.md # Este arquivo
```


## 🧠 Fluxo de Funcionamento

1. **Consulta CNPJ**:
   - Usuário digita o CNPJ → Validação → Armazena em `localStorage` → Redireciona para `consulta-cnpj.html` → Back-end consulta no PostgreSQL → Se não encontrar, chama a API CNPJá → Exibe dados.

2. **Consulta NF-e por código de acesso**:
   - Valida os 44 dígitos → Gera XML ou PDF usando a API da CNPJá.

3. **Consulta DANFe por upload de XML**:
   - Leitura do arquivo → Envia o XML como `text/plain` → Recebe PDF em base64 → Exibe em um iframe.

## 📦 Instalação e Execução Local

### Pré-requisitos

- Qualquer servidor estático como o Live Server do VSCode
- Java 17+ e Spring Boot (para o back-end)
- PostgreSQL com uma tabela para cache dos CNPJs


## Como Usar

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/consulta-legal.git
2. Abra o index.html no navegador.

3. Certifique-se de que o back-end está rodando.
   
    - O repositório da API está disponível aqui: https://github.com/Joaomos/consulta-legal-api
    - Siga as instruções do `README` da API para configurá-la com PostgreSQL.

4. Use as funcionalidades disponíveis:
  - Digite um CNPJ válido para consultar.
  - Insira um código de acesso (44 dígitos) para baixar DANFe ou XML.
  - Faça upload de um arquivo XML para visualizar a DANFe.

## Observações
  - As chaves de acesso das APIs externas devem ser inseridas nas variáveis token e chaveAcesso dentro do script.js.
  - Certifique-se de que o CORS está habilitado no back-end caso deseje rodar localmente com front e back separados.
   
---

## 📞 Contato

Se tiver dúvidas ou sugestões, entre em contato:

- **Nome:** João Marcos
- **E-mail:** joaomarcos2827@gmail.com
- **GitHub:** [Joaomos](https://github.com/Joaomos)
- **LinkedIn:** [João Marcos](https://www.linkedin.com/in/ojoaomarcosilva/)
