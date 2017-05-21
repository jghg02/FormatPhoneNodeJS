/**
 * Created by jhgonzalez on 5/20/17.
 */
$(function()
{
    $('#file').on('change',function ()
    {
        var filePath = $(this).val();
        console.log(filePath);
        //alert(filePath)
    });

    $('form input').change(function () {
        $('form p').text(this.files.length + " file(s) selected");
    });

});


