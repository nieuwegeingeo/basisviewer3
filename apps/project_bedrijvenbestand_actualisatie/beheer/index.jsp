<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1" import="java.io.File,java.io.IOException,java.util.*,java.io.*" %>
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Apps</title>
    <script src="../../../../basisviewer2/lib/jquery-ui/js/jquery-1.10.2.min.js" type="text/javascript"></script>
    <style>
        *,
        ::before,
        ::after {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            font-family: 'Montserrat', sans-serif;
        }

        .no-select {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        html {
            height: 100%;
        }

        body {
            height: 100%;
            display: flex;
            overflow: hidden;
            font-family: sans-serif;
        }

        #menu-block__container {
            width: 100%;
            overflow-y: scroll;
        }

        #menu-block {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            margin-top: 60px;
        }

        #menu-list {
            width: 20%;
            min-width: 300px;
            overflow-y: scroll;
            margin-top: 60px;

        }

        .hidden {
            display: none !important;
        }

        .top-bar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 60px;
            background-color: white;
            border-bottom: 1px solid #842e93;
            z-index: 999;
        }

        .top-bar h3 {
            position: absolute;
            top: 15px;
            left: 5px;

        }

        .block-search__box {
            position: absolute;
            width: 220px;
            top: 30px;
            left: 250px;
            transform: translateY(-50%);
        }

        .list-search__box {
            position: absolute;
            width: 190px;
            top: 46px;
            left: 190px;
            transform: translateY(-50%);
        }

        #kaartdiv {
            width: 80%;
            max-width: calc(100% - 300px);
            height: 100%;
            z-index: 1000;
            background-color: white;
        }

        .labelCont-block {
            position: relative;
            display: flex;
            width: 20%;
            min-width: 250px;
            height: 30vh;
            min-height: 250px;
            justify-content: center;
            align-items: center;
        }



        a {
            color: #88179F;
            font-size: medium;
        }

        a.preview {
            font-style: italic;
            text-decoration: none;
            padding-right: 20px;
            height: 100%;
            width: 10%;
            right: 0;
        }

        .preview-block {
            position: absolute;
            right: 12%;
            top: 0;
            width: 40px;
            height: 35px;
            border: 2px solid black;
            border-radius: 50%;
            background-color: white;
            align-items: center;
        }

        .preview-block:hover {
            background-color: #ccc;
            border: 3px solid black;
        }

        .preview-block img {
            width: 90%;
            top: 50%;
            left: 50%;
            position: absolute;
            transform: translate(-50%, -50%);
        }

        a.label-block {
            display: flex;
            flex-direction: column;
            width: 90%;
            max-width: 250px;
            height: 90%;
            max-height: 250px;
            background-color: #945b96;
            color: white;
            border: 2px solid black;
            word-break: break-all;
            font-size: 12px;
            text-decoration: none;
            border-radius: 10px;
            text-align: center;
            justify-content: center;
            box-shadow: 4px 3px 12px 3px #ccc;
        }

        a.label-block span {
            height: 15%;
            line-height: 4em;
        }

        .preview img {
            width: 20px;
            margin: 4px
        }

        .label-block:hover {
            background-color: #804f82;
            border: 4px solid black;
        }

        .labelCont-list {
            display: flex;

        }

        a.label-list,
        a.label-list span {
            width: 90%;
            font-family: serif;
        }

        .labelCont-list:hover {
            background-color: #ccc;
        }

        .layout-switcher {
            display: flex;
            position: fixed;
            top: 5px;
            left: 5px;
            width: 200px;
            height: 25px;

            z-index: 1000;
        }

        .layout-switcher__item {
            width: 50%;
            height: 100%;
            background-color: white;
            border: 1px solid #842e93;
            text-align: center;
            line-height: 1.3em;
            color: white;
            cursor: pointer;
            background-color: #945b96;
        }

        .layout-switcher__list {
            border-radius: 10px 0 0 10px;
        }

        .layout-switcher__block {
            border-radius: 0 10px 10px 0;
        }

        .layout-switcher__item:hover {
            background-color: #804f82;
        }

        .active {
            background-color: #804f82;
            pointer-events: none;
            cursor: default;
        }

        .thumbnail {
            width: 60%;
            max-height: 60%;
            margin-left: auto;
            margin-right: auto;

            border: 1px solid #842e93;
            border-radius: 10px;
        }

        .popup-map__container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.3);
            z-index: 1001;
        }

        .close-button {
            position: absolute;
            top: 15px;
            right: 15px;
            width: 50px;
            height: 50px;
            background-color: white;
            z-index: 1002;
            border: 2px solid #842e93;
            color: #842e93;
            border-radius: 50%;
            font-size: 40px;
            text-align: center;
            line-height: 1em;
            cursor: pointer;
        }

        .close-button::after {
            content: '\292B';
        }

        .popup-map {
            position: absolute;
            top: 5%;
            left: 5%;
            width: 85%;
            height: 90%;
            border-radius: 10px;
        }

        .add-app__button {
            position: absolute;
            top: 10px;
            right: 10px;
            width: 100px;
            height: 30px;
        }
    </style>
</head>

<body>
    <div class="layout-switcher no-select">
        <div class="layout-switcher__item layout-switcher__list active">Lijst</div>
        <div class="layout-switcher__item layout-switcher__block">Tegels</div>
    </div>
    <div id="menu-block__container" class="hidden">
        <div class="top-bar">
            <h3>Beschikbare apps:</h3>
            <input type="text" class="block-search__box" onkeyup="listSearch('.block-search__box','.label-block')"
                placeholder="Zoek een app...">
            <button class="add-app__button" onclick="openAddAppPage">Click me!</button>
        </div>
        <div id="menu-block">
            <%

File f = new File("./webapps/apps/project_bedrijvenbestand_actualisatie/beheer"); // current directory if started as Tomcat Windows Service
if(!f.exists() || !f.isDirectory()){
	f = new File("../webapps/apps/project_bedrijvenbestand_actualisatie/beheer"); // current directory if started in cmd box
}

File[] files = f.listFiles();
 for (File file : files) {
    if (file.isDirectory()) {
%>
            <div class="labelCont-block no-select">
                <a class="label-block" id="<%=file.getName()  %>"
                    href="${pageContext.request.contextPath}/project_bedrijvenbestand_actualisatie/beheer/<%=file.getName()  %>"><span><%=file.getName().replace("_"," ").substring(0, 1).toUpperCase() + file.getName().replace("_"," ").substring(1)%></span>
                    <br>
                    <% File[] list = file.listFiles();
     for (File listItem : list) {
        String name = listItem.getName();
        if (name.contains("thumbnail.png")) {
        %>
                    <img class="thumbnail"
                        src="${pageContext.request.contextPath}/project_bedrijvenbestand_actualisatie/beheer/<%=file.getName()%>/thumbnail.png">
                    <%
        }
     }
    %>
                </a>
                <div href="#" class="preview-block" onclick="openPreview('<%= file.getName() %>')"><img
                        src="../../../../basisviewer2/styles/img/preview-eye.png" alt="preview"></div>
            </div>
            <%
    }
}
%>
        </div>
    </div>
    <div id="menu-list" class="">
        <div class="top-bar">
            <h3>Beschikbare apps:</h3>
            <input type="text" class="list-search__box" onkeyup="listSearch('.list-search__box','.label-list')"
                placeholder="Zoek een app..." autofocus>
        </div>
        <%

File f2 = new File("./webapps/apps/project_bedrijvenbestand_actualisatie/beheer"); // current directory if started as Tomcat Windows Service
if(!f2.exists() || !f2.isDirectory()){
	f2 = new File("../webapps/apps/project_bedrijvenbestand_actualisatie/beheer"); // current directory if started in cmd box
}

File[] files2 = f2.listFiles();
 for (File file2 : files2) {
    if (file2.isDirectory()) {
%>
        <div class="labelCont-list">
            <a class="label-list visible" id="<%=file2.getName()  %>"
                href="${pageContext.request.contextPath}/project_bedrijvenbestand_actualisatie/beheer/<%=file2.getName()  %>"><span><%=file2.getName() %></span></a>
            <a href="#" class="preview"
                onclick="document.getElementById('kaart').src='${pageContext.request.contextPath}/project_bedrijvenbestand_actualisatie/beheer/<%=file2.getName() %>'"><img
                    src="../../../../basisviewer2/styles/img/preview-eye.png" alt="preview"></a>
            <br>
        </div>
        <%
    }
}
%>
    </div>
    <div id="kaartdiv" class="">
        <iframe id="kaart" src="../" style="height:100%;width:100%;"></iframe>
    </div>

    <script>
        $('.layout-switcher__item').on('click', function () {
            $('#kaartdiv').toggleClass('hidden')
            $('#menu-list').toggleClass('hidden')
            $('#menu-block__container').toggleClass('hidden')
            $('.layout-switcher__item').toggleClass('active')
        })


        function listSearch(list, item) {
            var listSearchbox, a, i;
            listSearchbox = $(list);
            listFilter = listSearchbox.prop('value').toLowerCase();
            //    beheerList =
            var som = 0
            var beheerListItem = $(item);
            for (i = 0; i < beheerListItem.length; i++) {
                //console.log(beheerListItem[i].getElementsByTagName("span")[0])
                a = beheerListItem[i].getElementsByTagName("span")[0];
                var listItem = beheerListItem[i]
                //console.log(a)
                if (a.innerHTML.toLowerCase().indexOf(listFilter) > -1) {
                    beheerListItem[i].parentElement.style.display = "";
                    if (!$(listItem).hasClass('visible')) {
                        $(listItem).toggleClass('visible');
                    }
                    som++
                    // if ($('.label-list').parent().prop('style') == 'display: none') {
                    // console.log('none')
                    // };
                } else {
                    beheerListItem[i].parentElement.style.display = "none";
                    if ($(listItem).hasClass('visible')) {
                        $(listItem).toggleClass('visible');
                    }
                }
            }

            var enterFunction = function (e) {
                if (e.keyCode == 13) {
                    var lastItem = $('.visible')[0];
                    window.location.href = lastItem.href;
                    $(document).unbind('keyup', enterFunction)
                }
            }

            if (som == 1) {
                $(document).bind('keyup', enterFunction)
            }
        }

        function closePopup() {
            $('.popup-map__container').remove();
        }

        function openPreview(name) {
            console.log('' + name + '')
            $('body').append('<div class="popup-map__container" onclick="closePopup()">' +
                '<div class="close-button" onclick="closePopup()"></div>' +
                '<iframe class="popup-map" src="${pageContext.request.contextPath}/' + name + '"><iframe>' +
                '</div>')
            // document.getElementById('kaart').src='${pageContext.request.contextPath}/%=file.getName() %>'
        }

        function openAddAppPage() {

        }
    </script>
</body>

</html>