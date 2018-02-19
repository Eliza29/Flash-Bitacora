$(document).ready(() => {
  // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();

  // seleccionando elementos del DOM
  let titleCommit = $('#first_name');
  let textAreaCommit = $('#textarea1');
  let btnPostText = $('#btn-post-text');
  // let btnPostText = $('#');  
  // let titleImage = $('');
  // let inputFile = $();

  // variables centinelas
  let titleCommitValid = false;
  let textAreaValid = false;

  // funcionalidad para activar y desactivar botón

  let activeButton = (btn) => {
    btn.removeClass('disabled');
  };

  let desactiveButton = (btn) => {
    btn.addClass('disabled');
  };

  // funcionalidad para validar los títulos de la bitácora

  let validateTextTitle = (textTitle) => {
    let valueTextTitle = textTitle.val();
    if ($.trim(valueTextTitle).length !== 0) {
      return true;
    } else {
      return false;
    }
  };

  // funcionalidad para validar todos los campos para publicar texto

  let allPostTextValid = () => {
    if (titleCommitValid && textAreaValid) {
      activeButton(btnPostText);
    } else {
      desactiveButton(btnPostText);
    }
  };

  // funcionalidad para agregar una nota de texto
  let isTitleCommitValid = () => { debugger;
    titleCommitValid = validateTextTitle(titleCommit);
    if (titleCommitValid) {
      allPostTextValid();
    } else {
      desactiveButton(btnPostText);
    }
  };

  // funcionalidad para validar textArea 
  let isTextAreaValid = () => { debugger;
    console.log(textAreaCommit.val());
    if ($.trim(textAreaCommit.val().length !== 0)) {
      textAreaValid = true;
      allPostTextValid();
    } else {
      textAreaValid = false;
      desactiveButton(btnPostText);
    }
  };

  let createPost = (title, textarea) => {
    let divPost = `
      <div class="col s12 box white mb">
        <div class="z-depth-2 post">
          <h5>${title}</h5>
          <p>${textarea}</p>
        </div>
      </div>
    `;
    $('#reference').after(divPost);
  };

  let showPost = (event) => {
    event.preventDefault();
    createPost(titleCommit.val(), textAreaCommit.val());
  };

  // asociando eventos a elementos del DOM
  titleCommit.on('input', isTitleCommitValid);
  textAreaCommit.on('input', isTextAreaValid);
  btnPostText.on('click', showPost);
});