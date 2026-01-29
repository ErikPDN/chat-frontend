export const formatMessageTime = (timestamp: string | number): string => {
  try {
    const date = typeof timestamp === 'string'
      ? new Date(timestamp)
      : new Date(timestamp);

    if (isNaN(date.getTime())) {
      return 'Agora';
    }

    return date.toLocaleString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return 'Agora';
  }
};

export const formatConversationTime = (timestamp: string | number): string => {
  try {
    const date = typeof timestamp === 'string'
      ? new Date(timestamp)
      : new Date(timestamp);

    if (isNaN(date.getTime())) {
      return 'Agora';
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    if (messageDate.getTime() === today.getTime()) {
      return date.toLocaleString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
    }

    if (messageDate.getTime() === yesterday.getTime()) {
      return 'Ontem';
    }

    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    if (messageDate.getTime() > sevenDaysAgo.getTime()) {
      return date.toLocaleString('pt-BR', { weekday: 'long' });
    }

    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return 'Agora';
  }
};

export const getDateKey = (timestamp: string | number): string => {
  try {
    const date = typeof timestamp === 'string'
      ? new Date(timestamp)
      : new Date(timestamp);

    if (isNaN(date.getTime())) {
      return '';
    }

    return date.toISOString().split('T')[0];
  } catch (error) {
    console.error('Erro ao obter chave de data:', error);
    return '';
  }
};

export const formatMessageDate = (timestamp: string | number): string => {
  try {
    const date = typeof timestamp === 'string'
      ? new Date(timestamp)
      : new Date(timestamp);

    if (isNaN(date.getTime())) {
      return 'Agora';
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    if (messageDate.getTime() === today.getTime()) {
      return 'Hoje';
    }

    if (messageDate.getTime() === yesterday.getTime()) {
      return 'Ontem';
    }

    const diffTime = today.getTime() - messageDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 7 && diffDays > 1) {
      const weekDays = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
      return weekDays[date.getDay()];
    }

    return date.toLocaleString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: date.getFullYear() === now.getFullYear() ? undefined : 'numeric',
    });
  } catch (error) {
    console.error('Erro ao formatar data da mensagem:', error);
    return 'Agora';
  }
};
