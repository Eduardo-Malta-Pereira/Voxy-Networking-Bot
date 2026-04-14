# Voxy Networking Bot

O **Voxy Networking Bot** é o núcleo de automação e gerenciamento do servidor de Minecraft Voxy Networking. Desenvolvido para centralizar as operações de suporte, moderação e interação da comunidade no Discord, o bot garante uma experiência organizada e segura para todos os jogadores.

## 🚀 Principais Funcionalidades

- **Sistema de Tickets**: Automação para suporte ao jogador, permitindo abertura de chamados organizados para a staff.
- **Gerenciamento de Regras**: Comando e mensagens estruturadas para exibição e aceitação das normas do servidor.
- **Moderação Avançada**: Ferramentas integradas para manter a integridade da comunidade.
- **Integração com Servidor**: Status e informações rápidas sobre o ambiente de jogo (Skyblock e modpacks).

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Ambiente de execução Javascript.
- **Discord.js**: Biblioteca para interação com a API do Discord.
- **JSON**: Utilizado para configurações e armazenamento local de dados.

## ⚙️ Instalação e Configuração

Como este bot utiliza arquivos de configuração sensíveis (que estão no `.gitignore`), você precisará criá-los manualmente para rodar o projeto localmente.

1.  **Clonar o repositório:**
    ```bash
    git clone [https://github.com/Eduardo-Malta-Pereira/Voxy-Networking-Bot.git](https://github.com/Eduardo-Malta-Pereira/Voxy-Networking-Bot.git)
    cd Voxy-Networking-Bot
    ```

2.  **Instalar dependências:**
    ```bash
    npm install
    ```

3.  **Configuração:**
    Crie um arquivo `config.json` na raiz seguindo o modelo do `config.example.json` e insira o seu Token do Discord.

4.  **Iniciar o bot:**
    ```bash
    npm start
    ```
