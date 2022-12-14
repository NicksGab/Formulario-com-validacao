class IsValidForm {
  constructor() {
    this.formulario = document.querySelector('.formulario')
    this.events();
  }

  events() {
    this.formulario.addEventListener('submit', e => {
      this.handleSubmit(e);
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const validFields = this.isValid();
    const validPasswords = this.validPasswords();

    if(validFields && validPasswords) {
      alert('Formulário enviado com sucesso! :)')
      this.formulario.submit();
    }
  }

  validPasswords() {
    let valid = true;

    const password = this.formulario.querySelector('.senha');
    const repeatPassword = this. formulario.querySelector('.repetir-senha');

    if(password.value !== repeatPassword.value) {
      valid = false;
      this.createError(password, 'Campos senha e repetir senha precisam ser iguais.');
      this.createError(repeatPassword, 'Campos senha e repetir senha precisam ser iguais.');
    }

    if(password.value.length < 6 || password.value.length > 12) {
      valid = false;
      this.createError(password, 'Senha precisa estar entre 6 e 12 caracteres.')
    }

    return valid;
  }

  isValid() {
    let valid = true;

    for(let errorText of this.formulario.querySelectorAll('.error-text')) {
      errorText.remove();
    }

    for (let campo of this.formulario.querySelectorAll('.validar')) {
     if(!campo.value) {
      const label = campo.previousElementSibling.innerText;
      this.createError(campo, `Campo ${label} não pode estar em branco.`);
      valid = false;
     }

     if(campo.classList.contains('cpf')) {
      if(!this.validaCPF(campo)) valid = false
     }

     if(campo.classList.contains('usuario')) {
      if(!this.validaUsuario(campo)) valid = false
     }

    }

    return valid;
  }

  validaUsuario(campo) {
    const usuario = campo.value
    let valid = true;

    if(usuario.length < 3 || usuario.length > 12) {
      this.createError(campo, 'Usuário precisa ter entre 3 e 12 caracteres.');
      valid = false;
    }

    if(!usuario.match(/^[a-zA-Z0-9]+$/g)) {
      this.createError(campo, 'Nome de usuário precisa conter apenas letras e/ou números.');
      valid = false;
    }

    return valid;
  }

  validaCPF(campo) {
    const cpf = new ValidaCPF(campo.value);

    if(!cpf.valida()) {
      this.createError(campo, 'CPF inválido!');
      return false;
    }

    return true;
  }

  createError(campo, msg) {
    const div = document.createElement('div');
    div.innerHTML = msg;
    div.classList.add('error-text');
    campo.insertAdjacentElement('afterend', div);
  }
}

const valida = new IsValidForm();