import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeSlash, ArrowLeft, Check } from 'phosphor-react';
import { useAuth } from '../../contexts/AuthContext';
import apiService from '../../services/apiService';
import {
  PageContainer,
  PageHeader,
  BackButton,
  PageTitle,
  FormCard,
  Form,
  FormGroup,
  Label,
  InputContainer,
  Input,
  TogglePasswordButton,
  ErrorMessage,
  SuccessMessage,
  ButtonGroup,
  CancelButton,
  SubmitButton,
  PasswordStrength,
  StrengthBar,
  StrengthText
} from './AlterarSenha.styles';

function AlterarSenha() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Função para calcular força da senha
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const getStrengthLabel = (strength) => {
    switch (strength) {
      case 0:
      case 1: return 'Muito fraca';
      case 2: return 'Fraca';
      case 3: return 'Média';
      case 4: return 'Forte';
      case 5: return 'Muito forte';
      default: return '';
    }
  };

  const getStrengthColor = (strength) => {
    switch (strength) {
      case 0:
      case 1: return '#ff4757';
      case 2: return '#ff6b35';
      case 3: return '#ffa502';
      case 4: return '#2ed573';
      case 5: return '#1dd1a1';
      default: return '#ddd';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar erro do campo quando usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Senha atual é obrigatória';
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'Nova senha é obrigatória';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'A nova senha deve ter pelo menos 8 caracteres';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    if (formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = 'A nova senha deve ser diferente da atual';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      // Chamar a API de alteração de senha
      await apiService.changePassword(formData.currentPassword, formData.newPassword);

      setSuccessMessage('Senha alterada com sucesso!');
      
      // Limpar formulário
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });

      // Redirecionar após 2 segundos
      setTimeout(() => {
        navigate('/configuracoes');
      }, 2000);

    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      
      // Verificar se o erro é de senha atual incorreta
      if (error.message.includes('senha atual') || error.message.includes('current password')) {
        setErrors({
          currentPassword: 'Senha atual incorreta'
        });
      } else {
        setErrors({
          general: error.message || 'Erro ao alterar senha. Tente novamente.'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = calculatePasswordStrength(formData.newPassword);

  return (
    <PageContainer>
      <PageHeader
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <BackButton onClick={() => navigate('/configuracoes')}>
          <ArrowLeft size={20} />
        </BackButton>
        <PageTitle>
          <Lock size={24} />
          Alterar Senha
        </PageTitle>
      </PageHeader>

      <FormCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Form onSubmit={handleSubmit}>
          {errors.general && (
            <ErrorMessage
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {errors.general}
            </ErrorMessage>
          )}

          {successMessage && (
            <SuccessMessage
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Check size={20} />
              {successMessage}
            </SuccessMessage>
          )}

          <FormGroup>
            <Label htmlFor="currentPassword">Senha Atual</Label>
            <InputContainer>
              <Input
                type={showPasswords.current ? 'text' : 'password'}
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                placeholder="Digite sua senha atual"
                $hasError={!!errors.currentPassword}
              />
              <TogglePasswordButton
                type="button"
                onClick={() => togglePasswordVisibility('current')}
              >
                {showPasswords.current ? <EyeSlash size={20} /> : <Eye size={20} />}
              </TogglePasswordButton>
            </InputContainer>
            {errors.currentPassword && (
              <ErrorMessage>{errors.currentPassword}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="newPassword">Nova Senha</Label>
            <InputContainer>
              <Input
                type={showPasswords.new ? 'text' : 'password'}
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="Digite sua nova senha"
                $hasError={!!errors.newPassword}
              />
              <TogglePasswordButton
                type="button"
                onClick={() => togglePasswordVisibility('new')}
              >
                {showPasswords.new ? <EyeSlash size={20} /> : <Eye size={20} />}
              </TogglePasswordButton>
            </InputContainer>
            
            {formData.newPassword && (
              <PasswordStrength>
                <StrengthBar 
                  $strength={passwordStrength}
                  $color={getStrengthColor(passwordStrength)}
                />
                <StrengthText $color={getStrengthColor(passwordStrength)}>
                  {getStrengthLabel(passwordStrength)}
                </StrengthText>
              </PasswordStrength>
            )}
            
            {errors.newPassword && (
              <ErrorMessage>{errors.newPassword}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
            <InputContainer>
              <Input
                type={showPasswords.confirm ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirme sua nova senha"
                $hasError={!!errors.confirmPassword}
              />
              <TogglePasswordButton
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
              >
                {showPasswords.confirm ? <EyeSlash size={20} /> : <Eye size={20} />}
              </TogglePasswordButton>
            </InputContainer>
            {errors.confirmPassword && (
              <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
            )}
          </FormGroup>

          <ButtonGroup>
            <CancelButton 
              type="button" 
              onClick={() => navigate('/configuracoes')}
              disabled={isLoading}
            >
              Cancelar
            </CancelButton>
            <SubmitButton 
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? 'Alterando...' : 'Alterar Senha'}
            </SubmitButton>
          </ButtonGroup>
        </Form>
      </FormCard>
    </PageContainer>
  );
}

export default AlterarSenha;