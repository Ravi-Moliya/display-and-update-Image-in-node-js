$(document).ready(function(){

    showimage();
    $(document).on("click",".Editdata",function(){
        showimage("SELECTALLASPEROBJECTID",$(this).attr('data-userID'));
    
    });
    var FileFlag = false; FileExtFlag = false; FileSizeFlag = false;
    $("#FU_ProductImage").change(function(){
        $("#ProductImageValidate").empty();
        var Filesize = document.getElementById("FU_ProductImage").files[0].size / 1024 / 1024;
        if(document.getElementById("FU_ProductImage").files.length == 0)
        {
            $("#ProductImageValidate").html("Invalid File Size OR No File Selected..!!<br />File Size Must Be Higher Than 0 MB & Lower Than 100 MB..!!");
            FileFlag = false;
            document.getElementById("ImgProductDisplayPic").src = "DefaultProduct.jpg";
        
        }
        else
        {
            FileFlag = true;
           var extension = document.getElementById("FU_ProductImage").value.split('.').pop().toLowerCase();
            var fileextension = ['jpeg','jpg','png','bmp'];

            if($.inArray(extension,fileextension) == -1)
            {
                $("#ProductImageValidate").html("Only .jpeg,.jpg,.png or .bmp files are acceptable..!!");
                FileExtFlag = false;
                document.getElementById("ImgProductDisplayPic").src = "DefaultProduct.jpg";
            }
            else
            {
                FileExtFlag = true;
            }

            if(Filesize > 100)
            {
                $("#ProductImageValidate").html("Only .jpeg,.jpg,.png or .bmp files are acceptable..!!");
                FileSizeFlag = false;
                document.getElementById("ImgProductDisplayPic").src = "DefaultProduct.jpg";
            
            }
            else
            {
                FileSizeFlag = true;
            }

        }
        if (FileFlag == true && FileSizeFlag == true && FileExtFlag == true) {
            var reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("ImgProductDisplayPic").src = e.target.result;
            };
            reader.readAsDataURL(document.getElementById("FU_ProductImage").files[0]);
        }
        else {
            document.getElementById("ImgProductDisplayPic").src = "DefaultProduct.jpg";
            $("#FU_ProductImage").replaceWith($("#FU_ProductImage")).val("").clone(true);
        }
    });
    $("#btnupdate").click(function(){
       
        $("#ProductImageValidate").empty();
        var Filesize = document.getElementById("FU_ProductImage").files[0].size / 1024 / 1024;
        if(document.getElementById("FU_ProductImage").files.length == 0)
        {
            $("#ProductImageValidate").html("Invalid File Size OR No File Selected..!!<br />File Size Must Be Higher Than 0 MB & Lower Than 100 MB..!!");
            FileFlag = false;
            document.getElementById("ImgProductDisplayPic").src = "DefaultProduct.jpg";
        
        }
        else
        {
            FileFlag = true;
           var extension = document.getElementById("FU_ProductImage").value.split('.').pop().toLowerCase();
            var fileextension = ['jpeg','jpg','png','bmp'];

            if($.inArray(extension,fileextension) == -1)
            {
                $("#ProductImageValidate").html("Only .jpeg,.jpg,.png or .bmp files are acceptable..!!");
                FileExtFlag = false;
                document.getElementById("ImgProductDisplayPic").src = "DefaultProduct.jpg";
            }
            else
            {
                FileExtFlag = true;
            }

            if(Filesize > 100)
            {
                $("#ProductImageValidate").html("Only .jpeg,.jpg,.png or .bmp files are acceptable..!!");
                FileSizeFlag = false;
                document.getElementById("ImgProductDisplayPic").src = "DefaultProduct.jpg";
            
            }
            else
            {
                FileSizeFlag = true;
            }

        }
        if(FileFlag == true && FileSizeFlag == true && FileExtFlag == true)
        {
            
            var  IMGDATA=null;
        
            var filetoupload = document.getElementById("FU_ProductImage").files;
            var FD = new FormData();

            FD.append("filetoupload",filetoupload[0]);
            var contenttype ={
                header:{"content-type":"multipart/form-data"}
            }
            var useImgID = $(this).attr("data-userID");
            axios.post('/FileUpload',FD,contenttype)
            .then(function(response){
                IMGDATA = response.data;
                UpdateAccount(IMGDATA,useImgID,$("#FNAME").val().trim(),$("#LNAME").val().trim());
                document.getElementById("ImgProductDisplayPic").src = "DefaultProduct.jpg";
            $("#FU_ProductImage").replaceWith($("#FU_ProductImage")).val("").clone(true);
        
                alert("upload successfullyyy....");
                
            })
            .catch(function(error){
                console.log(error);
            });
            
           
        }      
            
       

    });
    
});
function showimage(findOps,Key)
{
    
    $.ajax({
        url:'/imagerecordApi',
        type:'get',
        data:{findOps:findOps,Key:Key},
        cache:false,
        dataType:'JSON',
        success:function(data)
        {
            
            var userarr = JSON.parse(data);
            if(findOps == "SELECTALLASPEROBJECTID")
            {
               
                document.getElementById("ImgProductDisplayPic").src = userarr[0].TxtIMAGE;
                $("#FNAME").val(userarr[0].TxtFNAME);
                $("#LNAME").val(userarr[0].TxtLNAME);
                $("#btnupdate").attr("data-userID",userarr[0]._id);
            }
            else
            {
                $("#imagebody").empty();
                if(userarr.length>0)
                {
                
                    for(var i = 0;i<userarr.length;i++)
                    {
                        var j=i+1;
                        var ImgProduct=null;
                        if(userarr[i].TxtIMAGE){
                            
                            ImgProduct = "<img src='./"+userarr[i].TxtIMAGE+"' alt='Profile Image' height='150px' width='150px' />";
                        
                        }
                        else{
                            ImgProduct = "<img src='DefaultProduct.jpg' alt='Default Image' height='50px' width='50px'/>";
                        }
                        $("#imagebody").append(
                                
                            "<tr>"
                            +"<td>"+j+"</td>"
                                +"<td>"+userarr[i]._id+"</td>"
                                +"<td>"+ImgProduct+"</td>"
                                +"<td><a data-toggle='modal' data-target='#myModal' class='Editdata' data-userID='"+userarr[i]._id+"'> <i class='fa fa-2x fa-edit'></i></a></td>"
                            +"</tr>"
                        
                        );
                    }
                    
                }
            }
        },
        failur:function()
        {
            alert("sorry...");

        }
    });
}
function UpdateAccount(IMGDATA,ImegMemberId,FNAME,LNAME)
{   

    
        $.ajax({   
        url:'/imagerecordApi', 
        type:'post',
        cache:false,
        data:{IMGDATA:IMGDATA,ImegMemberId:ImegMemberId,FNAME:FNAME,LNAME:LNAME},
        success:function(data)
        {
            $("#myModal .close").click();
            showimage();
        },
        failure:function()
        {
            alert("sorry.....");
        }
    });
    return true;
}