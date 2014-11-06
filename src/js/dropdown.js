  // DROPDOWN Extension
  // ===============================

  var toggle   = '[data-toggle=dropdown]';
  executables.push(
      function() {
          var $par
              , firstItem
              , focusDelay = 200
              , menus = $(toggle).parent().find('ul').attr('role', 'menu')
              , lis = menus.find('li').attr('role', 'presentation')

          lis.find('a').attr({'role': 'menuitem', 'tabIndex': '-1'})
          $(toggle).attr({ 'aria-haspopup': 'true', 'aria-expanded': 'false'})

          $(toggle).parent().on('shown.bs.dropdown', function (e) {
              $par = $(this)
              var $toggle = $par.find(toggle)
              $toggle.attr('aria-expanded', 'true')

              setTimeout(function () {
                  firstItem = $('.dropdown-menu [role=menuitem]:visible', $par)[0]
                  try {
                      firstItem.focus()
                  } catch (ex) {
                  }
              }, focusDelay)
          })

          $(toggle).parent().on('hidden.bs.dropdown', function (e) {
              $par = $(this)
              var $toggle = $par.find(toggle)
              $toggle.attr('aria-expanded', 'false')
              $toggle.focus();
          })
      });
    //Adding Space Key Behaviour, opens on spacebar
    $.fn.dropdown.Constructor.prototype.keydown = function (e) {
      var  $par
        , firstItem
      if (!/(32)/.test(e.keyCode)) return
        $par = $(this).parent()
        $(this).trigger ("click")
        e.preventDefault() && e.stopPropagation()
    }

    $(document)
      .on('focusout.dropdown.data-api', '.dropdown-menu', function(e){
        var $this = $(this)
                    , that = this
        setTimeout(function() {
         if(!$.contains(that, document.activeElement)){
          $this.parent().removeClass('open')
          $this.parent().find('[data-toggle=dropdown]').attr('aria-expanded','false')
         }
        }, 150)
       })
      .on('keydown.bs.dropdown.data-api', toggle + ', [role=menu]' , $.fn.dropdown.Constructor.prototype.keydown)
