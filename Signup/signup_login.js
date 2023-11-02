window.onload=function(){
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
      });
      
      signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
      });
      $(document).ready(function() {

  
        var readURL = function(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
        
                reader.onload = function (e) {
                    $('.profile-pic').attr('src', e.target.result);
                }
        
                reader.readAsDataURL(input.files[0]);
            }
        }
        
        
        $(".file-upload").on('change', function(){
            readURL(this);
        });
        
        $(".upload-button").on('click', function() {
           $(".file-upload").click();
        });
        });
  }

  
