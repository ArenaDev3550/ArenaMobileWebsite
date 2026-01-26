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
  ListItem
} from './Legal.styles';

const Terms = () => {
  const navigate = useNavigate();

  return (
    <LegalContainer>
      <LegalContent>
        <BackButton onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
          Voltar
        </BackButton>

        <Header>
          <Title>Termos de Uso</Title>
          <LastUpdated>Última atualização: 26 de janeiro de 2026</LastUpdated>
        </Header>

        <Section>
          <SectionTitle>1. Aceitação dos Termos</SectionTitle>
          <Paragraph>
            Aceitando este documento, o Usuário visa registrar a manifestação livre, informada e inequívoca pela qual concorda com o tratamento de seus dados pessoais para finalidade específica, em conformidade com a Lei nº 13.709 – Lei Geral de Proteção de Dados Pessoais (LGPD), consentindo que AGORA MEDIO EIRELI (COLÉGIO ARENA), estabelecimento particular de ensino, inscrito no CNPJ sob o nº 26.039.391/0001-41, com endereço na Av. T-3, nº 2267, CEP 74.215-160, Goiânia/GO (COLÉGIO ARENA) tome decisões referentes ao tratamento de seus dados pessoais, realize o tratamento de seus dados pessoais, envolvendo operações como as que se referem a coleta, produção, recepção, classificação, utilização, acesso, reprodução, transmissão, distribuição, processamento, arquivamento, armazenamento, eliminação, avaliação ou controle da informação, modificação, comunicação, transferência, difusão ou extração.
          </Paragraph>
          <Paragraph>
            Ao acessar e utilizar o ArenaMobile, você concorda em cumprir e estar vinculado aos 
            seguintes termos e condições de uso. Se você não concordar com algum desses termos, 
            está proibido de usar ou acessar este site. Os materiais contidos neste site são 
            protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>2. Descrição do Serviço</SectionTitle>
          <Paragraph>
            O ArenaMobile é uma plataforma educacional que oferece aos estudantes, responsáveis 
            e professores do Colégio Arena acesso a:
          </Paragraph>
          <List>
            <ListItem>Informações acadêmicas (notas, avaliações, horários)</ListItem>
            <ListItem>Sistema de agendamento com professores</ListItem>
            <ListItem>Comunicados e avisos escolares</ListItem>
            <ListItem>Registro de ocorrências</ListItem>
            <ListItem>Boletim escolar</ListItem>
            <ListItem>Integração com Google Calendar</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>3. Elegibilidade e Cadastro</SectionTitle>
          <Paragraph>
            O uso do ArenaMobile é restrito a:
          </Paragraph>
          <List>
            <ListItem>Alunos regularmente matriculados no Colégio Arena</ListItem>
            <ListItem>Responsáveis legais de alunos matriculados</ListItem>
            <ListItem>Professores e funcionários autorizados do Colégio Arena</ListItem>
          </List>
          <Paragraph>
            Para acessar o aplicativo, você deve fornecer credenciais válidas fornecidas pela 
            instituição. Você é responsável por manter a confidencialidade de suas credenciais 
            de acesso.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>4. Uso Aceitável</SectionTitle>
          <Paragraph>
            Ao utilizar o ArenaMobile, você concorda em:
          </Paragraph>
          <List>
            <ListItem>Utilizar o serviço apenas para fins educacionais legítimos</ListItem>
            <ListItem>Não compartilhar suas credenciais de acesso com terceiros</ListItem>
            <ListItem>Não tentar acessar áreas restritas ou dados de outros usuários</ListItem>
            <ListItem>Não utilizar o serviço para atividades ilegais ou não autorizadas</ListItem>
            <ListItem>Não transmitir vírus, malware ou qualquer código malicioso</ListItem>
            <ListItem>Respeitar os direitos autorais e propriedade intelectual</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>5. Integração com Google</SectionTitle>
          <Paragraph>
            O ArenaMobile utiliza a API do Google Calendar para facilitar o agendamento de 
            compromissos. Ao autorizar essa integração, você concorda que:
          </Paragraph>
          <List>
            <ListItem>Os dados de agendamento serão sincronizados com sua conta Google</ListItem>
            <ListItem>Você pode revogar o acesso a qualquer momento através das configurações do Google</ListItem>
            <ListItem>A integração está sujeita aos Termos de Serviço do Google</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>6. Propriedade Intelectual</SectionTitle>
          <Paragraph>
            Todo o conteúdo, design, logotipos, marcas e funcionalidades do ArenaMobile são 
            propriedade exclusiva do Colégio Arena e estão protegidos por leis de propriedade 
            intelectual brasileiras e internacionais.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>7. Privacidade e Proteção de Dados</SectionTitle>
          <Paragraph>
            O tratamento dos seus dados pessoais é regido pela nossa Política de Privacidade, 
            que está em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018). 
            Ao utilizar o ArenaMobile, você consente com a coleta e uso de informações conforme 
            descrito na Política de Privacidade.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>8. Limitação de Responsabilidade</SectionTitle>
          <Paragraph>
            O Colégio Arena se esforça para manter o ArenaMobile funcionando adequadamente, mas não 
            garante que o serviço será ininterrupto, seguro ou livre de erros. Não nos responsabilizamos por:
          </Paragraph>
          <List>
            <ListItem>Interrupções temporárias do serviço para manutenção</ListItem>
            <ListItem>Perda de dados devido a falhas técnicas</ListItem>
            <ListItem>Danos indiretos resultantes do uso do aplicativo</ListItem>
            <ListItem>Problemas decorrentes de integrações com serviços de terceiros</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>9. Modificações dos Termos</SectionTitle>
          <Paragraph>
            O Colégio Arena reserva-se o direito de modificar estes Termos de Uso a qualquer momento. 
            As alterações entrarão em vigor imediatamente após a publicação. O uso continuado do 
            aplicativo após as alterações constitui aceitação dos novos termos.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>10. Suspensão e Encerramento</SectionTitle>
          <Paragraph>
            O Colégio Arena reserva-se o direito de suspender ou encerrar o acesso de qualquer usuário 
            que viole estes Termos de Uso, sem aviso prévio.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>11. Lei Aplicável</SectionTitle>
          <Paragraph>
            Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. 
            Qualquer disputa será resolvida no foro da comarca de Goiânia, Estado de Goiás.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>12. Contato</SectionTitle>
          <Paragraph>
            Para dúvidas, sugestões ou solicitações relacionadas a estes Termos de Uso, entre em contato:
          </Paragraph>
          <List>
            <ListItem>Telefone: (62) 3920 3250</ListItem>
            <ListItem>Endereço: Av. T-3, nº 2267 - Colégio Arena - Goiânia, GO</ListItem>
          </List>
        </Section>
      </LegalContent>
    </LegalContainer>
  );
};

export default Terms;
