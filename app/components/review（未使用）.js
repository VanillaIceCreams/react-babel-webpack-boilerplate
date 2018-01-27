/**
 * Created by Administrator on 2018/1/24.
 */

export default class MyReview extends React.Component {
  render() {
    return (
      <div>
        <ReviewList/>
        <br/>
        <ReviewForm/>
      </div>
    );
  }
}
class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {reviewList: []};
  }

  componentDidMount() {
    $.get("http://localhost:8081/test/review.json", (result)=> {
        if (result.status == 200) {
          this.setState({
            reviewList: result.data
          })
        }
      }
    )
  }

  render() {
    return (
      <div className="card">
        {this.state.reviewList.map((review)=>{
          return (<div className="card-content">
            <div className="media">
              <div className="media-content"  style={{overflow: "visible"}}>
                <p className="title is-5">{review.name}</p>
                <p className="subtitle is-6">{review.email}</p>
              </div>
            </div>

            <div className="content" >
              {review.content}
              <br/>

            </div>
            <time className="column has-text-right">{new Date(review.createTime).toLocaleString()}</time>
          </div>)
        })}

      </div>
    );
  }
}
class ReviewForm extends React.Component {
  render() {
    return (
      <div>
        <div className="field">
          <label className="label">姓名</label>
          <div className="control">
            <input className="input" type="text" placeholder="name"
                   data-easyform="null;"
                   data-message="请填写姓名"
                   data-easytip="position:top;class:easy-blue;"/>
          </div>
          <label className="label">邮箱</label>
          <div className="control">
            <input className="input" type="text" placeholder="email"
                   data-easyform="email;"
                   data-message="邮箱格式错误"
                   data-easytip="position:bottom;class:easy-blue;"/>
          </div>
          <label className="label">评论</label>
          <div className="control">
            <textarea className="textarea" placeholder="Textarea"/>
          </div>
        </div>
        <div className="field is-grouped is-grouped-right">
          <p className="control">
            <a className="button is-primary">
              Submit
            </a>
          </p>
          <p className="control">
            <a className="button is-light">
              Clear
            </a>
          </p>
        </div>

      </div>
    );
  }
}


