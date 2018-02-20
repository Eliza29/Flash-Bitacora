$(document).ready(() => {
  // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();

  // seleccionando elementos del DOM
  let titleCommit = $('#first_name');
  let textAreaCommit = $('#textarea1');
  let btnPostText = $('#btn-post-text');
  let btnPostImg = $('#btn-send-img');
  let titleImage = $('#title2');
  let inputFile = $('#input-file');
  let srcImg;  

  // variables centinelas
  let titleCommitValid = false;
  let textAreaValid = false;
  let titleImageValid = false;
  let inputFileValid = false;

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
  let isTitleCommitValid = () => {
    titleCommitValid = validateTextTitle(titleCommit);
    if (titleCommitValid) {
      allPostTextValid();
    } else {
      desactiveButton(btnPostText);
    }
  };

  // funcionalidad para validar textArea 
  let isTextAreaValid = () => {
    console.log(textAreaCommit.val());
    if ($.trim(textAreaCommit.val().length !== 0)) {
      textAreaValid = true;
      allPostTextValid();
    } else {
      textAreaValid = false;
      desactiveButton(btnPostText);
    }
  };

  // funcionalidad para mostrar y ñadir el post de texto en el DOM
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

  // funcionalidad para postear una imagen
  let createPostImg = () => {
    console.log(srcImg);
    let divPost = `
      <div class="col s12 box white mb">
        <div class="z-depth-2 post">
          <h5>${titleImage.val()}</h5>
          <div class='s11'>
            <img src="${srcImg}" class='responsive-img'>            
          </div>
        </div>
      </div>
    `;
    $('#reference').after(divPost);    
  };

  let isImageValid = () => { debugger;
    if ($('input.file-path').val()) {
      inputFileValid = true;
      allInputsImageValid();
    } else {
      inputFileValid = false;
      desactiveButton(btnPostImg);
    }
  };

  let getImage = (event) => { debugger;
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      function handleFileSelect(event) {
        function fileInformation(theFile) {
          return function(evt) {
            // Render thumbnail.
            srcImg = evt.target.result;
            console.log(srcImg);
          };
        };

        var files = event.target.files; // FileList object
        console.log(files);
        // Loop through the FileList and render image files as thumbnails.
        [...files].forEach(element => {
          // Only process image files.
          if (element.type.match('image.*')) {
            var reader = new FileReader();

            // Closure to capture the file information.
            reader.onload = fileInformation(element);

            // Read in the image file as a data URL.
            reader.readAsDataURL(element);
          }
        });
      }
      handleFileSelect(event);    
    } else {
      alert('The File APIs are not fully supported in this browser.');
    }    
  };

  let allInputsImageValid = () => {
    if (titleImageValid && inputFileValid) {
      activeButton(btnPostImg);
    } else {
      desactiveButton(btnPostImg);
    }
  };

  let isTitleImageValid = () => { debugger;
    titleImageValid = validateTextTitle(titleImage);
    if (titleImageValid) {
      allInputsImageValid();
    } else {
      desactiveButton(btnPostImg);
    }
  };

  // asociando eventos a elementos del DOM
  titleCommit.on('input', isTitleCommitValid);
  textAreaCommit.on('input', isTextAreaValid);
  btnPostText.on('click', showPost);
  titleImage.on('input', isTitleImageValid);
  inputFile.on('change', getImage);
  btnPostImg.on('click', createPostImg);
  $('input.file-path').on('change', isImageValid);
});