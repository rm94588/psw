document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function(e) {
        // Criar mensagem de sucesso
        const mensagem = document.createElement('div');
        mensagem.textContent = 'Formulário enviado com sucesso!';
        mensagem.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px 20px;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            font-weight: bold;
        `;
        
        document.body.appendChild(mensagem);
        
        // Remover mensagem após 3 segundos
        setTimeout(() => {
            mensagem.remove();
        }, 3000);
    });
});