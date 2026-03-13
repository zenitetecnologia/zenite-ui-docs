//combobox
document.addEventListener('DOMContentLoaded', () => {
  const comboboxes = document.querySelectorAll('.zf-combobox');

  comboboxes.forEach(combobox => {
    const input = combobox.querySelector('.zf-combobox-input');
    const items = combobox.querySelectorAll('.zf-combobox-item');
    const clearBtn = combobox.querySelector('.zf-combobox-clear'); 

    const toggleClearBtn = () => {
      if (input.value.trim() !== '') {
        combobox.classList.add('has-value');
      } else {
        combobox.classList.remove('has-value');
      }
    };

    if (clearBtn) {
      clearBtn.addEventListener('mousedown', (e) => {
        e.preventDefault(); 
        e.stopPropagation(); 
        
        input.value = ''; 
        toggleClearBtn();
        
        items.forEach(item => item.style.display = '');
        
        input.focus();
      });
    }

    input.addEventListener('focus', () => {
      combobox.classList.add('active');
    });

    input.addEventListener('mousedown', (e) => {
      if (e.offsetX > input.offsetWidth - 40) {
        e.preventDefault();
        
        combobox.classList.toggle('active'); 
        
        if (combobox.classList.contains('active')) {
          input.focus();
        }
      }
    });

    //filtra itens
    input.addEventListener('input', (e) => {
      toggleClearBtn();
      const termoPesquisa = e.target.value.toLowerCase();

      items.forEach(item => {
        const textoItem = item.textContent.toLowerCase();

        if (textoItem.includes(termoPesquisa)) {
          item.style.display = ''; 
        } else {
          item.style.display = 'none';
        }
      });
    });

    //seleciona item
    items.forEach(item => {
      item.addEventListener('click', () => {
        const nomeElemento = item.querySelector('.zf-cb-name');

        let cpfElemento = item.querySelector('.zf-cb-cpf');
        let nomeSelecionado = "";
        let idSelecionado = item.getAttribute('data-id') || "Sem ID"; 

        if (nomeElemento) {
          nomeSelecionado = nomeElemento.textContent.trim();
          input.value = nomeSelecionado;
        } else {
          nomeSelecionado = item.textContent.trim();
          input.value = nomeSelecionado;
        }

        toggleClearBtn();
        combobox.classList.remove('active');

        const dadosJSON = {
          id: idSelecionado,
          nome: nomeSelecionado,
          cpf: cpfElemento ? cpfElemento.textContent.trim() : "CPF não encontrado"
        };

        console.log("Objeto Selecionado:", JSON.stringify(dadosJSON, null, 2));
      });
    });

    //fecha lista se clicar fora
    document.addEventListener('click', (e) => {
      if (!combobox.contains(e.target)) {
        combobox.classList.remove('active');
      }
    });

    //filtra itens
    input.addEventListener('input', (e) => {
      const termoPesquisa = e.target.value.toLowerCase();

      items.forEach(item => {
        const textoItem = item.textContent.toLowerCase();

        if (textoItem.includes(termoPesquisa)) {
          item.style.display = ''; 
        } else {
          item.style.display = 'none';
        }
      });
    });

    //seleciona item
    items.forEach(item => {
      item.addEventListener('click', () => {
        const nomeElemento = item.querySelector('.zf-cb-name');

        let cpfElemento = item.querySelector('.zf-cb-cpf');
        let nomeSelecionado = "";
        let idSelecionado = item.getAttribute('data-id') || "Sem ID"; 

        if (nomeElemento) {
          nomeSelecionado = nomeElemento.textContent.trim();
          input.value = nomeSelecionado;
        } else {
          nomeSelecionado = item.textContent.trim();
          input.value = nomeSelecionado;
        }

        combobox.classList.remove('active');

        const dadosJSON = {
          id: idSelecionado,
          nome: nomeSelecionado,
          cpf: cpfElemento ? cpfElemento.textContent.trim() : "CPF não encontrado"
        };

        console.log("Objeto Selecionado:", JSON.stringify(dadosJSON, null, 2));
        alert("JSON:\n" + JSON.stringify(dadosJSON, null, 2));
      });
    });

    //fecha lista se clicar fora
    document.addEventListener('click', (e) => {
      if (!combobox.contains(e.target)) {
        combobox.classList.remove('active');
      }
    });
  });

//--------------------------------------------------------------------------
//dark/light mode toggle
  const themeSwitch = document.getElementById('theme-toggle');
  const themeLabel = document.getElementById('theme-label');

  if (themeSwitch) {
    themeSwitch.addEventListener('change', (e) => {
      if (e.target.checked) {
        document.documentElement.removeAttribute('data-theme');
        themeLabel.textContent = "Modo Escuro Ativado";
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeLabel.textContent = "Modo Claro Ativado";
      }
    });
  }
});