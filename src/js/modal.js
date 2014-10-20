  // Modal Extension
  // ===============================
  executables.push(
      function() {
          $('.modal-dialog').attr({'role': 'document'})
      });
    var modalhide =   $.fn.modal.Constructor.prototype.hide
    $.fn.modal.Constructor.prototype.hide = function(){
       var modalOpener = this.$element.parent().find('[data-target="#' + this.$element.attr('id') + '"]')
       modalhide.apply(this, arguments)
       modalOpener.focus()
    }