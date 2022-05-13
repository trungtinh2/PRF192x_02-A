
//tạo light box
$(document).ready(function () {
    $(".search-btn").click(function () {
        $(".backdrop, .box").css("display", "block")
    });
    $(".search-button").click(function () {
        close();
    });
    $(".close").click(function () {
        close();
    });
    $(".backdrop").click(function () {
        close();
    });
    function close() {
        $(".backdrop, .box").css("display", "none")
    }

    function start() {
        loading();
        topnews();
        $(".search-button").click(function () {
            searchNews();
        })
    }
    start();
    // icon loading
    function loading() {
        var loading = `<p>loading<i class = "fa fa-spinner"></i></p>`;
        $(".list").html(loading);
    }
    //fetch tin tức đang hot       
    function topnews() {
        var headlinesApi = "https://gnews.io/api/v4/top-headlines?token=f4b2fde0b3750aa6b6af3524c0ead812&lang=en";
        fetch(headlinesApi)
            .then(function (response) {
                return response.json();
            })

            .then(function (data) {
                var arr = data.articles.map(function (printer) {
                    return `<div class="box1 row"> 
                    <div class="col-sm-3 image">
                    <img src="${printer.image}"alt="error">
                 </div>
                    <div class="font-size col-sm-9 ">
                    <a href="${printer.url} "target="_blank">${printer.title}</a><br>
                    <i>${printer.publishedAt}</i><br>
                    <p>${printer.description}</p></div></div>`
                });
                console.log(arr);
                var prin = arr.join("");
                $(".list").html(prin);
            })
            }
    
 //fetch tin tức được tìm bằng từ khóa
    function searchNews() {
        var keywords = $(".keywords").val();
        var searchApi = " https://gnews.io/api/v4/search?q=" + keywords + "&token=0de566bbfdff686085b4a69452195fbe";
        if (keywords != "") {
            loading();
            fetch(searchApi)
                .then(function (response) {
                    return response.json();
                })

                .then(function (data) {
                    var arr = data.articles.map(function (printer) {
                        return `<div class="box1 row"> 
                        <div class="col-sm-3 image">
                        <img src="${printer.image}"alt="error">
                     </div>
                        <div class="font-size col-sm-9 ">
                        <a href="${printer.url} "target="_blank">${printer.title}</a><br>
                        <i>${printer.publishedAt}</i><br>
                        <p>${printer.description}</p></div></div>`
                    });
                    
                    var prin = arr.join("");
                    $(".list").html(prin);
                })
        } else {
            alert("không được để trống!!!")
        }
    }
});
