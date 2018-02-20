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
  let titleVideo = $('#title4');
  let inputVideo = $('#input-video');
  let btnPostVideo = $('#btn-post-video');
  let inputUrlImg = $('#input-url-img');
  let inputUrlVideo = $('#input-url-video');
  let typeVideo;
  let typeAudio;
  let srcVideo;
  let srcAudio;

  // variables centinelas
  let titleCommitValid = false;
  let textAreaValid = false;
  let titleImageValid = false;
  let inputFileValid = false;
  let titleVideoValid = false;
  let inputVideoValid = false;

  // funcionalidad para activar y desactivar botón

  let activeButton = (btn) => {
    btn.removeClass('disabled');
  };

  let desactiveButton = (btn) => {
    btn.addClass('disabled');
  };

  // funcionalidad para reiniciar las funcionalidades
  let reset = (title, input, btn) => {
    $(title).val('');
    $(title).removeClass('valid');
    $(input).val('');
    $(input).removeClass('valid');
    desactiveButton(btn);
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

  let allPostTextValid = () => { debugger;
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
    if ($.trim(textAreaCommit.val()).length !== 0) {
      textAreaValid = true;
      allPostTextValid();
    } else {
      textAreaValid = false;
      desactiveButton(btnPostText);
    }
  };

  // funcionalidad para mostrar y añadir el post de texto en el DOM

  let createPost = (title, textarea) => { debugger;
    let divPost = `
      <div class="col s12 box white mb">
        <div class="z-depth-2 post">
          <h5>${title}</h5>
          <p>${textarea}</p>
        </div>
      </div>
    `;
    $('#reference').after(divPost);
    reset(titleCommit, textAreaCommit, btnPostText);
    titleCommitValid = false;
    textAreaValid = false;
  };

  let showPost = (event) => {
    event.preventDefault();
    createPost(titleCommit.val(), textAreaCommit.val());
  };

  // funcionalidad para postear una imagen
  
  let createPostImg = () => {
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
    reset(titleImage, inputUrlImg, btnPostImg);
    titleImageValid = false;
    inputFileValid = false;
  };

  let allInputsImageValid = () => {
    if (titleImageValid && inputFileValid) {
      activeButton(btnPostImg);
    } else {
      desactiveButton(btnPostImg);
    }
  };

  let isImageValid = () => {
    if ($('#input-url-img').val()) {
      inputFileValid = true;
      allInputsImageValid();
    } else {
      inputFileValid = false;
      desactiveButton(btnPostImg);
    }
  };

  let getImage = (event) => {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      function handleFileSelect(event) {
        function fileInformation(theFile) {
          return function (evt) {
            // Render thumbnail.
            srcImg = evt.target.result;
            typeVideo = theFile.type;
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

  let isTitleImageValid = () => {
    titleImageValid = validateTextTitle(titleImage);
    if (titleImageValid) {
      allInputsImageValid();
    } else {
      desactiveButton(btnPostImg);
    }
  };

  // funcionalidad para publicar videos o audios

  let createPostVideo = () => { debugger;
    let divPost;
    if (typeVideo !== undefined && typeVideo.match('video.*')) {
      divPost = `
      <div class="col s12 box white mb">
        <div class="z-depth-2 post">
          <h5>${titleVideo.val()}</h5>
          <div class='row'>
            <div class='col s12 m10 offset-m1'>
              <video class="responsive-video" controls>
                <source src="${srcVideo}" type="${typeVideo}">
              </video>
            </div>
          </div>
        </div>
      </div>
    `;
    } else if (typeAudio !== undefined && typeAudio.match('audio.*')) {
      divPost = `
      <div class="col s12 box white mb">
        <div class="z-depth-2 post">
          <h5>${titleVideo.val()}</h5>
          <div class='row'>
            <audio src="${srcAudio}" type='${typeAudio}' class='col s12 m12' controls>
              <p>Tu navegador no soporta este audio</p>
            </audio>
          </div>
        </div>
      </div>
    `;
    }
    $('#reference').after(divPost);
    reset(titleVideo, inputUrlVideo, btnPostVideo);
    titleVideoValid = false;
    inputVideoValid = false;
  };

  let allInputsVideoValid = () => { debugger;
    if (titleVideoValid && inputVideoValid) {
      activeButton(btnPostVideo);
    } else {
      desactiveButton(btnPostVideo);
    }
  };

  let getVideo = (event) => { debugger;
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      function handleVideoSelect(event) {
        function videoInformation(theFile) {
          return function(evt) {
            srcVideo = undefined;
            typeVideo = undefined;
            srcAudio = undefined;
            typeAudio = undefined;
            if (theFile.type.match('video.*')) {
              srcVideo = evt.target.result;
              typeVideo = theFile.type;
            } else if (theFile.type.match('audio.*')) {
              srcAudio = evt.target.result;
              typeAudio = theFile.type;
            }
          };
        };

        var files = event.target.files; // FileList object
        console.log(files);
        // Loop through the FileList and render image files as thumbnails.
        [...files].forEach(element => {
          // Only process image files.
          if (element.type.match('video.*') || element.type.match('audio.*')) {
            var reader = new FileReader();

            // Closure to capture the file information.
            reader.onload = videoInformation(element);

            // Read in the image file as a data URL.
            reader.readAsDataURL(element);
          }
        });
      }
      handleVideoSelect(event);
    } else {
      alert('The File APIs are not fully supported in this browser.');
    }
  };

  let isVideoValid = () => { debugger;
    if ($('#input-url-video').val()) {
      inputVideoValid = true;
      allInputsVideoValid();
    } else {
      inputVideoValid = false;
      desactiveButton(btnPostVideo);
    }
  };

  let isTitleVideoValid = () => { debugger;
    titleVideoValid = validateTextTitle(titleVideo);
    if (titleVideoValid) {
      allInputsVideoValid();
    } else {
      desactiveButton(btnPostVideo);
    }
  };

  // asociando eventos a elementos del DOM
  titleCommit.on('input', isTitleCommitValid);
  textAreaCommit.on('input', isTextAreaValid);
  btnPostText.on('click', showPost);
  titleImage.on('input', isTitleImageValid);
  $('input.file-path').on('change', isImageValid);
  inputFile.on('change', getImage);
  btnPostImg.on('click', createPostImg);
  titleVideo.on('input', isTitleVideoValid);
  inputVideo.on('change', getVideo);
  $('#input-url-video').on('change', isVideoValid);
  btnPostVideo.on('click', createPostVideo);
});