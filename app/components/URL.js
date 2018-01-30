/**
 * Created by Administrator on 2018/1/28.
 */
export default {
  listSortListURL: "http://localhost:8080/api/sort/",//获取分类集合的地址
  articleURL:"http://localhost:8080/api/article/",//获取文章 跟{lv}/{sortId}或者{articleId}
  exitURL: "http://localhost:8080/api/user/exit/",//退出登录
  ifLoginURL:"http://localhost:8080/api/user/ifLogin/",//验证是否已登录
  articleAmountURL:"http://localhost:8080/api/articleAmount/",//获取文章总数  需要跟{lv}/{sortId}
  loginURL:"http://localhost:8080/api/user/login/",//登录
  reviewUrl: "http://localhost:8080/api/review/",//需要跟{articleId}
  recentArticleURL:"http://localhost:8080/api/recentArticle",//获取最近的N条数据，用？num= ***  来访问
  imageURL:"http://localhost:8080/api/image/",//获取图片列表
  imagePreURL:"http://localhost:8080/image/",//图片路径前缀
  recentReviewURL:"http://localhost:8080/api/recentReview",//获取最近的N条数据，用？num= ***  来访问

}

