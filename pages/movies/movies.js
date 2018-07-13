var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     * 豆瓣api地址  https://developers.douban.com/wiki/?title=guide
     *  start表示第几页 count每页几条数据
     */
    onLoad: function(event) {
        var inTheatersUrl = app.globalDate.doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3"; //
        var comingSoonUrl = app.globalDate.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3"; // 即将上映
        var top250Url = app.globalDate.doubanBase + "/v2/movie/top250" + "?start=0&count=3"; // 豆瓣Top250
        // this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
        // this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
        // this.getMovieListData(top250Url, "top250", "豆瓣Top250");
        this.getMovieListData(inTheatersUrl);
        // this.getMovieListData(comingSoonUrl);
        // this.getMovieListData(top250Url);
    },
    getMovieListData: function(url) {
        var that = this;
        wx.request({
            url: url,
            data: {},
            method: 'GET',
            header: {
                'content-type': 'application/xml'
            },
            success: function(res) {
                // console.log(res);
                that.processDoubanData(res.data);
            },
            fail: function() {
                console.log('fail');
            },
            complete: function() {

            }
        })
    },
    // 统一处理返回的数据
    processDoubanData: function(moviesDouban) {
        // 定义一个空数组作为处理完数据的容器
        let movies = [];

        for (let index in moviesDouban.subjects) {
            let subjects = moviesDouban.subjects[index];
            // console.log(subjects);
            let title = subjects.title;
            // 处理名称
            if (title.length >= 6) {
                title = title.substring(0, 6) + "...";
            }
            var temp = {
                title: title,
                average: subjects.rating.average,
                coverageUrl: subjects.images.large,
                movieId: subjects.id
            }
            movies.push(temp);
        }
        console.log(movies);
        this.setData({
            movies: movies
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})