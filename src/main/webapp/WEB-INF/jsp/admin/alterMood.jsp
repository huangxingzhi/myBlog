<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%@taglib prefix="c" uri="/WEB-INF/tld/c.tld" %>
<%@taglib prefix="fn" uri="/WEB-INF/tld/fn.tld" %>
<%@taglib prefix="fmt" uri="/WEB-INF/tld/fmt.tld" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <jsp:include page="/WEB-INF/jsp/admin/include/header.jsp"/>
    <link rel="stylesheet" type="text/css" href="/static/css/webuploader.css">
    <script type="text/javascript" src="/static/js/webuploader.js"></script>
    <title>mood</title>
    <script type="text/javascript">
        function alterCheck() {
            var pictureId = document.getElementById("pictureId").value;
            if (pictureId == "") {
                layer.alert("文件名不能为空!", {icon: 2});
                return false;
            }
            // 提交表单
            document.forms["alterMoodForm"].submit();
        }

        function goBack() {
            layer.confirm('确定放弃？',{icon: 3, title:'提示'}, function(index){
                window.location.href = "/mood/manage";
            });
        }
    </script>
</head>
<body class="skin-black">
<!-- 头部 -->
<jsp:include page="/WEB-INF/jsp/admin/include/top.jsp"/>
<div class="wrapper row-offcanvas row-offcanvas-left">
    <jsp:include page="/WEB-INF/jsp/admin/include/left.jsp">
        <jsp:param name="type" value="2"/>
    </jsp:include>
    <aside id="rightMenu" class="right-side">
        <section class="content">
            <form id="alterMoodForm" name="alterMoodForm" action="/mood/alter" method="post">
                <input type="hidden" name="moodId" id="moodId" value="${mood.moodId}">
                <input type="hidden" name="pictureName" id="pictureName" value="${mood.pictureName}">
                <input type="hidden" name="pictureId" id="pictureId" value="${mood.pictureId}">
                <table class="layui-table">
                    <tr>
                        <td colspan="2" height="40"><strong style="font-size: 20px;">修改心情信息</strong></td>
                    </tr>
                    <tr>
                        <td height="30" style="font-size: 18px;">心情配图</td>
                        <td height="30" style="font-size: 18px;">
                            <div id="uploader">
                                <!-- 选择文件区域 -->
                                <div id="filePicker" style="float: left;"><i class="layui-icon">&#xe67c;</i>上传图片</div>
                                <!-- 显示文件列表信息 -->
                                <ul id="fileList" style="float: left;margin-left:10px;"><img style="width: 50px; height:50px;" src="${mood.pictureName}" onerror="javascript:this.src='/static/images/error.jpg';this.onerror = null"></ul>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td height="30" style="font-size: 18px;">心情内容</td>
                        <td height="30" style="font-size: 18px;">
                            <textarea style="width:100%;box-sizing:border-box; -webkit-box-sizing:border-box;-moz-box-sizing:border-box;-o-box-sizing:border-box;resize:none" id="editor" name="content" class="layui-textarea">${mood.content}</textarea>
                        </td>
                    </tr>
                </table>
                <br/> <br/> <br/>
                <center>
                    <input type="button" class="layui-btn" value="确定" onclick="alterCheck();"/>
                    <input type="button" class="layui-btn layui-btn-danger" value="返回" onclick="goBack();"/>
                </center>
            </form>
        </section>
    </aside>
</div>
<jsp:include page="./include/uploader.jsp"></jsp:include>
<jsp:include page="./include/ckeditor.jsp"></jsp:include>
<jsp:include page="./include/bottom.jsp"></jsp:include>
</body>
</html>