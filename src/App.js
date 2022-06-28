import {useEffect, useState} from 'react';
import './App.css';


function App() {
  let [name, setName] = useState('');
  let [nameDirty, setNameDirty] = useState(false);
  let [nameError, setNameError] = useState('Поле имя не может быть пустым');

  let [email, setEmail] = useState('');
  let [emailDirty, setEmailDirty] = useState(false);
  let [emailError, setEmailError] = useState('Поле емейл не может быть пустым');

  let [posts, setPosts] = useState('');
  let [postsDirty, setPostsDirty] = useState(false);
  let [postsError, setPostsError] = useState('Поле сообщение не может быть пустым');

  let [date, setDate] = useState('');
  let [dateDirty, setDateDirty] = useState(false);
  let [dateError, setDateError] = useState('Выберите дату рождения');

  let [tel, setTel] = useState('+7');
  let [telDirty, setTelDirty] = useState(false);
  let [telError, setTelError] = useState('Поле номер телефона не может быть пустым');


  let [formValid, setFormValid] = useState(false);


  const [error, setError] = useState(null);
  const [isPostsLoading, setIsPostsLoading] = useState(false);

  const [items, setItems] = useState('');


async function sendData () {
    await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: 'foo',
        body: {name: name,
               email: email
              },
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(res => res.json())
      .then(
        (result) => {
          setItems(result.body.name);
          setIsPostsLoading(false)
          console.log(result.body.name)
          setName('');
          setEmail('');
          setPosts('');
          setDate('');
          setTel('+7')
        }
      )
      .catch(err => {
        setError('Failed to fetch')
        setIsPostsLoading(false)}) 
      
  }

  let sendData2 = (e) => {
    setIsPostsLoading(true);

    e.preventDefault();
    setFormValid(false);
    setTimeout((e) => {
      sendData(e);
    }, 2000);
    
    
   
    console.log(items)
  if(items) {
    setEmail('')
  }
    
  }


  useEffect(() => {
    if(nameError|| emailError || postsError || dateError) {
      setFormValid(false) 
    } else {
      setFormValid(true)
    }
  }, [nameError, emailError, postsError, dateError])

let emailHandler =(e) => {
  setEmail(e.target.value);
  let re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    if(!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Некорректный емейл')
    } else {
      setEmailError('');
    }
    if(items.length) {
    e.target.value.reset()
    }
}

 let nameHandler = (e) => {
  setName(e.target.value.toUpperCase());
    if(/^\s*(\w+)\s*$/.test(e.target.value) !=true) {
      setNameError("должны использоваться слова из латинского алфавита")
    }

if(e.target.value.split(' ').length !=2 ) {
  setNameError("введите корректно имя и фамилию");
  console.log(e.target.value.split(' '))
} else
  if(e.target.value.split(' ')[0].length < 3 || e.target.value.split(' ')[0].length > 30 || /^\s*(\w+)\s*$/.test(e.target.value.split(' ')[0]) ===false ) {
    setNameError("введите корректно имя и фамилию")

  } 
  else   if(e.target.value.split(' ')[1].length < 3 || e.target.value.split(' ')[1].length > 30 || /^\s*(\w+)\s*$/.test(e.target.value.split(' ')[1]) ===false) {
    setNameError("введите корректно имя и фамилию") }

  else{
    setNameError('');
  }
 }

 let postsHandler = (e) => {
  setPosts(e.target.value);
  if(e.target.value.length < 11 || e.target.value.length > 300 ) {
    setPostsError("введите корректно Сообщение")
  } else {
    setPostsError('');
  }
 }
 let dateHandler = (e) => {
    setDate(e.target.value);
    if(!e.target.value) {
      setDateError('выберите дату')
    } else {
      setDateError('');
    }
}


  let blurHandler = (e) => {
    e.preventDefault();
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true)
        break
        case 'name':
          setNameDirty(true)
          break
          case 'Posts':
            setPostsDirty(true)
            break
            case 'date':
              setDateDirty(true)
              break;
              default: 
              setTelDirty(true)
    }
  }




  let phoneHandler =  (e) => {
    setTel(e.target.value)
}


  return (


    <div className='App'>
     <form>
       {isPostsLoading? <h3>идет загрузка</h3> : 
       <div className='container'>  
          <h3>Регистрация</h3>
          <div className="input">
                  <input onChange={e => nameHandler(e)} onBlur={e => blurHandler(e)}  value={name} name='name' type='text' placeholder='Enter your name...'/>
                  {(nameDirty&&nameError) && <div className='text' style={{color:'red'}}>{nameError}</div>}
          </div>

          <div className="input">
                  <input onChange={e => emailHandler(e)} onBlur={e => blurHandler(e)} value={email} name='email' type="text" placeholder='Enter your email...'/>
                  {(emailDirty&&emailError) && <div className='text'  style={{color:'red'}}>{emailError}</div>}
          </div>

          <div className="input">
                 <input onChange={e => phoneHandler(e)} onBlur={e => blurHandler(e)} type="tel" id="phone" value={tel} name="phone" type="text" placeholder='Enter your phone...'  data-phone-pattern = "+7 (___) ___-__-__"/>
          </div>

          <div className="input">
                <input onChange={e => dateHandler(e)} onBlur={e => blurHandler(e)} type='date' name="date" size = "15" value={date}></input>
                {(dateDirty&&dateError) && <div className='text'  style={{color:'red'}}>{dateError}</div>}
          </div>

          <div className="area">
                  <textarea onChange={e => postsHandler(e)} onBlur={e => blurHandler(e)} value={posts} name="Posts" cols="35" rows="3"></textarea>
                  {(postsDirty&&postsError) && <div className='text'  style={{color:'red'}}>{postsError}</div>}
          </div>


          <div className='lower'>
                <button disabled={formValid===false} type="submit" onClick={e => sendData2(e)}>registration</button>
          </div>
     
      
      </div>}
     
     </form>

     {items.length ? <div className='successful'>Успешная отправка!!!</div> : <div>{error}</div>}
     
    </div>
  );
}

export default App;
