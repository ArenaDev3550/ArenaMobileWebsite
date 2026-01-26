import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'phosphor-react';
import {
  LegalContainer,
  LegalContent,
  BackButton,
  Header,
  Title,
  LastUpdated,
  Section,
  SectionTitle,
  Paragraph,
  List,
  ListItem,
  Highlight
} from './Legal.styles';

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <LegalContainer>
      <LegalContent>
        <BackButton onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
          Voltar
        </BackButton>

        <Header>
          <Title>Política de Privacidade e Proteção de Dados</Title>
          <LastUpdated>Última atualização: 26 de janeiro de 2026</LastUpdated>
        </Header>

        <Section>
          <Paragraph>
            <Highlight>
              Esta Política de Privacidade está em conformidade com a Lei Geral de Proteção de Dados 
              (LGPD - Lei nº 13.709/2018) e descreve como o Colégio Arena coleta, utiliza, armazena 
              e protege os dados pessoais dos usuários do ArenaMobile.
            </Highlight>
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>1. Controlador de Dados</SectionTitle>
          <Paragraph>
            <strong>Colégio Arena</strong> é o controlador dos dados pessoais coletados através do ArenaMobile.
          </Paragraph>
          <List>
            <ListItem>CNPJ: 28.233.964/0001-07</ListItem>
            <ListItem>Endereço: Av. T-3, nº 2267, CEP 74.215-160, Goiânia - GO</ListItem>
            <ListItem>Telefone: (62) 3920-3250</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>2. Dados Coletados</SectionTitle>
          <Paragraph>
            Coletamos os seguintes tipos de dados pessoais:
          </Paragraph>
          
          <Paragraph><strong>2.1. Dados Cadastrais:</strong></Paragraph>
          <List>
            <ListItem>Nome completo</ListItem>
            <ListItem>RA (Registro Acadêmico)</ListItem>
            <ListItem>E-mail institucional</ListItem>
            <ListItem>Data de nascimento</ListItem>
            <ListItem>Telefones de contato</ListItem>
            <ListItem>Turma e série</ListItem>
            <ListItem>Sexo/Gênero</ListItem>
          </List>

          <Paragraph><strong>2.2. Dados Acadêmicos:</strong></Paragraph>
          <List>
            <ListItem>Notas e avaliações</ListItem>
            <ListItem>Frequência e presença</ListItem>
            <ListItem>Horários de aula</ListItem>
            <ListItem>Histórico de ocorrências</ListItem>
            <ListItem>Boletim escolar</ListItem>
          </List>

          <Paragraph><strong>2.3. Dados de Uso:</strong></Paragraph>
          <List>
            <ListItem>Logs de acesso e autenticação</ListItem>
            <ListItem>Endereço IP</ListItem>
            <ListItem>Tipo de dispositivo e navegador</ListItem>
            <ListItem>Horários de acesso ao sistema</ListItem>
            <ListItem>Páginas visitadas dentro do aplicativo</ListItem>
          </List>

          <Paragraph><strong>2.4. Dados de Integração Google:</strong></Paragraph>
          <List>
            <ListItem>E-mail da conta Google</ListItem>
            <ListItem>Nome e foto do perfil Google</ListItem>
            <ListItem>Permissões de acesso ao Google Calendar (apenas leitura e escrita de eventos)</ListItem>
            <ListItem>Tokens de autenticação OAuth 2.0</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>3. Finalidade do Tratamento de Dados</SectionTitle>
          <Paragraph>
            Utilizamos seus dados pessoais para as seguintes finalidades:
          </Paragraph>
          <List>
            <ListItem><strong>Gestão Acadêmica:</strong> Fornecimento de informações sobre desempenho escolar, 
            horários, avaliações e ocorrências</ListItem>
            <ListItem><strong>Autenticação e Segurança:</strong> Controle de acesso ao sistema e proteção 
            contra uso não autorizado</ListItem>
            <ListItem><strong>Comunicação:</strong> Envio de comunicados, avisos e notificações importantes</ListItem>
            <ListItem><strong>Agendamento:</strong> Facilitação de agendamentos com professores através da 
            integração com Google Calendar</ListItem>
            <ListItem><strong>Melhorias do Serviço:</strong> Análise de uso para aprimoramento contínuo 
            do aplicativo</ListItem>
            <ListItem><strong>Cumprimento Legal:</strong> Atendimento a obrigações legais e regulatórias</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>4. Base Legal para Tratamento</SectionTitle>
          <Paragraph>
            O tratamento de dados pessoais é realizado com base nas seguintes hipóteses legais 
            previstas na LGPD:
          </Paragraph>
          <List>
            <ListItem><strong>Execução de Contrato (Art. 7º, V):</strong> Para prestação dos serviços 
            educacionais contratados</ListItem>
            <ListItem><strong>Obrigação Legal (Art. 7º, II):</strong> Cumprimento de obrigações legais 
            e regulatórias do setor educacional</ListItem>
            <ListItem><strong>Legítimo Interesse (Art. 7º, IX):</strong> Para garantia da segurança e 
            melhoria contínua dos serviços</ListItem>
            <ListItem><strong>Consentimento (Art. 7º, I):</strong> Para integrações com serviços de 
            terceiros como Google Calendar</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>5. Compartilhamento de Dados</SectionTitle>
          <Paragraph>
            Seus dados pessoais podem ser compartilhados com:
          </Paragraph>
          <List>
            <ListItem><strong>Professores e Coordenação:</strong> Acesso limitado a dados acadêmicos 
            necessários para o exercício de suas funções</ListItem>
            <ListItem><strong>Google LLC:</strong> Apenas para funcionamento da integração com Google Calendar, 
            conforme autorização do usuário</ListItem>
            <ListItem><strong>Prestadores de Serviços:</strong> Empresas de hospedagem e infraestrutura 
            tecnológica sob acordos de confidencialidade</ListItem>
            <ListItem><strong>Autoridades Competentes:</strong> Quando exigido por lei ou ordem judicial</ListItem>
          </List>
          <Paragraph>
            <Highlight>
              Não vendemos, alugamos ou comercializamos seus dados pessoais com terceiros para fins 
              de marketing.
            </Highlight>
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>6. Uso da API do Google</SectionTitle>
          <Paragraph>
            O ArenaMobile utiliza a API do Google Calendar e está em conformidade com as 
            <a href="https://developers.google.com/terms/api-services-user-data-policy" 
               target="_blank" rel="noopener noreferrer"> Políticas de Dados do Usuário dos Serviços de API do Google</a>.
          </Paragraph>
          <Paragraph>
            <strong>Escopo de Acesso:</strong>
          </Paragraph>
          <List>
            <ListItem>Leitura de eventos do calendário (calendar.readonly)</ListItem>
            <ListItem>Criação e edição de eventos específicos (calendar.events)</ListItem>
          </List>
          <Paragraph>
            <strong>Limitações de Uso:</strong>
          </Paragraph>
          <List>
            <ListItem>Os dados obtidos do Google são utilizados exclusivamente para as funcionalidades 
            de agendamento do ArenaMobile</ListItem>
            <ListItem>Não transferimos dados do Google para terceiros</ListItem>
            <ListItem>Não utilizamos dados do Google para publicidade</ListItem>
            <ListItem>Você pode revogar o acesso a qualquer momento através das 
            <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer"> configurações de segurança da sua conta Google</a></ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>7. Segurança dos Dados</SectionTitle>
          <Paragraph>
            Implementamos medidas técnicas e organizacionais para proteger seus dados pessoais:
          </Paragraph>
          <List>
            <ListItem>Criptografia de dados em trânsito (HTTPS/TLS)</ListItem>
            <ListItem>Criptografia de senhas (hashing seguro)</ListItem>
            <ListItem>Controle de acesso baseado em perfis e permissões</ListItem>
            <ListItem>Monitoramento e logs de segurança</ListItem>
            <ListItem>Backups regulares e planos de recuperação de desastres</ListItem>
            <ListItem>Auditorias periódicas de segurança</ListItem>
            <ListItem>Treinamento de funcionários sobre proteção de dados</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>8. Armazenamento e Retenção</SectionTitle>
          <Paragraph>
            Seus dados pessoais são armazenados em servidores seguros e mantidos pelo tempo necessário para:
          </Paragraph>
          <List>
            <ListItem>Cumprimento das finalidades para as quais foram coletados</ListItem>
            <ListItem>Atendimento a obrigações legais e regulatórias do setor educacional</ListItem>
            <ListItem>Exercício regular de direitos em processos judiciais, administrativos ou arbitrais</ListItem>
          </List>
          <Paragraph>
            Após o término da relação contratual, os dados acadêmicos serão mantidos conforme 
            exigências legais aplicáveis ao setor educacional.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>9. Seus Direitos (Titular dos Dados)</SectionTitle>
          <Paragraph>
            Conforme a LGPD, você tem os seguintes direitos em relação aos seus dados pessoais:
          </Paragraph>
          <List>
            <ListItem><strong>Confirmação e Acesso:</strong> Saber se tratamos seus dados e acessá-los</ListItem>
            <ListItem><strong>Correção:</strong> Solicitar correção de dados incompletos, inexatos ou desatualizados</ListItem>
            <ListItem><strong>Anonimização, Bloqueio ou Eliminação:</strong> De dados desnecessários, 
            excessivos ou tratados em desconformidade</ListItem>
            <ListItem><strong>Portabilidade:</strong> Receber seus dados em formato estruturado e 
            interoperável</ListItem>
            <ListItem><strong>Eliminação:</strong> De dados tratados com base no consentimento, 
            salvo hipóteses de retenção previstas em lei</ListItem>
            <ListItem><strong>Informação sobre Compartilhamento:</strong> Saber com quais entidades 
            públicas e privadas compartilhamos seus dados</ListItem>
            <ListItem><strong>Revogação do Consentimento:</strong> Para integrações e tratamentos 
            baseados em consentimento</ListItem>
            <ListItem><strong>Oposição:</strong> A tratamento realizado em desconformidade com a LGPD</ListItem>
          </List>
          <Paragraph>
            Para exercer seus direitos, entre em contato através do e-mail: <strong>dpo@colegioarena.com.br</strong>
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>10. Dados de Menores de Idade</SectionTitle>
          <Paragraph>
            O tratamento de dados pessoais de crianças e adolescentes é realizado no melhor interesse 
            desses titulares, conforme Art. 14 da LGPD. Os responsáveis legais têm acesso às informações 
            dos menores sob sua responsabilidade e podem exercer todos os direitos em nome deles.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>11. Cookies e Tecnologias Similares</SectionTitle>
          <Paragraph>
            O ArenaMobile utiliza cookies e tecnologias similares para:
          </Paragraph>
          <List>
            <ListItem>Manter sua sessão ativa e autenticada</ListItem>
            <ListItem>Lembrar suas preferências de uso</ListItem>
            <ListItem>Melhorar a performance e experiência do usuário</ListItem>
            <ListItem>Coletar estatísticas de uso (de forma agregada e anonimizada)</ListItem>
          </List>
          <Paragraph>
            Você pode configurar seu navegador para recusar cookies, mas isso pode afetar algumas 
            funcionalidades do aplicativo.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>12. Transferência Internacional de Dados</SectionTitle>
          <Paragraph>
            Devido à integração com Google Calendar, alguns dados podem ser transferidos e armazenados 
            em servidores localizados fora do Brasil. Essas transferências são realizadas em conformidade 
            com a LGPD e mediante garantias adequadas de proteção, incluindo:
          </Paragraph>
          <List>
            <ListItem>Cláusulas contratuais padrão</ListItem>
            <ListItem>Certificações de conformidade (ex: ISO 27001)</ListItem>
            <ListItem>Adequação do país de destino conforme ANPD</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>13. Alterações nesta Política</SectionTitle>
          <Paragraph>
            Esta Política de Privacidade pode ser atualizada periodicamente. Notificaremos sobre 
            mudanças significativas através do aplicativo ou por e-mail. A data da última atualização 
            está sempre visível no topo deste documento.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>14. Encarregado de Proteção de Dados (DPO)</SectionTitle>
          <Paragraph>
            Para questões relacionadas à proteção de dados pessoais, você pode entrar em contato com 
            nosso Encarregado de Proteção de Dados:
          </Paragraph>
          <List>
            <ListItem>Telefone: (62) 3920 3250</ListItem>
            <ListItem>Horário de atendimento: Segunda a sexta, das 8h às 17h</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>15. Autoridade Nacional de Proteção de Dados</SectionTitle>
          <Paragraph>
            Caso não esteja satisfeito com a forma como tratamos seus dados pessoais, você pode 
            registrar uma reclamação junto à Autoridade Nacional de Proteção de Dados (ANPD):
          </Paragraph>
          <List>
            <ListItem>Site: <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer">www.gov.br/anpd</a></ListItem>
            <ListItem>Ouvidoria: ouvidoria@anpd.gov.br</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>16. Contato</SectionTitle>
          <Paragraph>
            Para dúvidas, solicitações ou exercício de direitos relacionados a esta Política de Privacidade:
          </Paragraph>
          <List>
            <ListItem>Telefone: (62) 3920 3250</ListItem>
            <ListItem>Endereço: Av. T-3, nº 2267 - Colégio Arena - Goiânia, GO</ListItem>
          </List>
        </Section>

        <Section>
          <Paragraph>
            <Highlight>
              Ao utilizar o ArenaMobile, você declara ter lido, compreendido e concordado com esta 
              Política de Privacidade e com nossos Termos de Uso.
            </Highlight>
          </Paragraph>
        </Section>
      </LegalContent>
    </LegalContainer>
  );
};

export default Privacy;
