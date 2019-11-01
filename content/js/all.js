
// let btf=document.querySelector('.butter-fly')

// scrollEvent=()=>{
//     // var scrollPos = window.scrollTop();
//     var scrollPos =window.pageYOffset;
//     console.log(window.pageYOffset);

//     btf.setAttribute('style','transform:translateY( ' + (scrollPos / 2) + 'px )')
// };





// window.addEventListener('scroll',scrollEvent,false);  



class App extends React.Component{
    constructor() {
        super();
        this.state = {
          content:'123',
          githubData:[],
        };
      }

      componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.getData();
    };
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    };

    handleScroll=()=>{
        var scrollPos =window.pageYOffset;
         console.log(window.pageYOffset);
        let btf=document.querySelector('.butter-fly');
        btf.setAttribute('style','transform:translateY( ' + (scrollPos / 2) + 'px )');

    };

    //載入github資料
    getData = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/users/Clifford0205/repos`,
        {
          method: "GET",
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json"
          })
        }
      );
      const jsonObject = await response.json();
      console.log(jsonObject);     
      var time = (+new Date());
      console.log(time);
      let newData=jsonObject.map(item=>({'name':item.name,'description':item.description,'url':item.html_url,'id':time++}));
      console.log(newData);
      await this.setState({githubData:newData})
    } catch (e) {
      console.log(e);
    } finally {
    }
  };
    render(){
      console.log(this.state.githubData);
      let data=this.state.githubData;
        return (
            <section class="wrap">
            <section class="img-area">
                <div class="for-pos container">
                    <div class="butter-fly"></div>
                </div>
            </section>

            <section class="white-area">
                <div class="for-horizon">
                    <div class="container myData">
                        <h1 class="text-center the-ttle">
                            我的Git Hub 資料
                        </h1>

                        <div className="my-git-area">
                          <ul>
                              {data.map((item,index)=>(
                                <li key={item.id} className="single-item">
                                  <div><h3 className="text-y">專案標題:{item.name}</h3></div>
                                  <div><h4 className="text-y">專案描述:{item.description}</h4></div>
                                  <div><h5 className="text-y">專案網址:<a href={item.url} target="_blank">{item.url}</a></h5></div>
                                </li>
                              ))}
                          </ul>
                        </div>
                    </div>
                </div>


            </section>
        </section>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);