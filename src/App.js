import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118890",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App(){
  const [showaddfriend,setshowaddfriend]=useState(false);
  const [showselect,setshowselect]=useState(null)
  const [friends,setfriend]=useState(initialFriends);
  function handshow(){
    setshowaddfriend(!showaddfriend);
  }
  function handladdfriend(friend){
    setfriend([...friends,...friend])
  }
  function handleselect(friend){
    setshowselect(friend)
    
  
  }
  
  return (
    <div className="app">
      <div className="sidebar">
      <Friendlist friend={friends} selctionFriend={showselect} onselect={handleselect} />
      {showaddfriend&&<FormaddFriend onaddfriend={handladdfriend} frien={friends}  show={setshowaddfriend} />}
       <Button oncli={handshow}>{showaddfriend ? "close":"Add friend"}</Button>
      </div>
      { showselect&& <Formsplitbill selectedfriend={showselect} />}
    </div>
  )
  }
function Friendlist({friend,onselect,selctionFriend}){
  const friends=friend;
 return (
<ul>
  {friends.map((friend,index)=>(
    <Friend selctionFriend={selctionFriend} key={index} friend={friend} onselect={onselect}/>
  ))}
</ul>
 )
}
function Friend({friend ,onselect,selctionFriend}){
  const selected=selctionFriend?.id===friend.id;
  console.log(friend.id===selctionFriend?.id);
 return (
  <li className={selected?'selected':''}>
    <img src={friend.image}  alt={friend.name}/>
    <h3>{friend.name}</h3>
    {friend.balance<0 && (
    <p className="red">you own {friend.name} {Math.abs(friend.balance)}$</p>)}
    {friend.balance>0 && (
    <p className="green"> {friend.name}  owes you {friend.balance}$</p>)}
    {friend.balance===0 && (
    <p className="">you and {friend.name} are even</p>)}
    <Button onclick={()=>onselect(friend)}>{ selected ? 'close':'select'}</Button>
  </li>
  
 )
}
function FormaddFriend({onaddfriend,show}){
  const [name,setname]=useState('');
  const [image,setimage]=useState('https://i.pravatar.cc/48?u=499'); 
  function handaddfriend(e){
  e.preventDefault();
 const id= crypto.randomUUID()
  const newfr=[{
    name,
    image:`${image}?=${id}`,
    balance:0,
    id,
  }]
  onaddfriend(newfr)
  show(false)
  setname('');

  }

 return (
  <form onSubmit={handaddfriend}
  className="form-add-friend">
  <label>🤷Friend name</label>
  <input type="text" onChange={(e)=>setname(e.target.value)}  value={name}  />
  <label>🌌Image URL</label>
  <input type="text" value={image} onChange={(e)=>setimage(e.target.value)}/>
  <Button>Add</Button>
  </form>
 )
}
function Button({children,onclick}){
  return(
 <button className="button" onClick={onclick}>{children}</button>
  )
}
function Formsplitbill({selectedfriend}){
  const [bill,setbill]=useState('');
  const [paidbyuser,setPaidByUser]=useState('');
 const paidbyfreind=bill? bill-paidbyuser:'';
 const [whoispaing,setWhoIsPaying]=useState('user')
  
  return (
    <form className="form-split-bill" >
      <h2>Split a Bill with {selectedfriend.name}</h2>
    <label>🤑bill value</label>
    <input value={bill} onChange={(e)=>{
      setbill(Number(e.target.value))
    }} type="number"/>
    <label>🤷your expence</label>
    <input  onChange={(e)=>{
     setPaidByUser( Number(e.target.value)>bill?paidbyuser:Number(e.target.value))
    }} type="number"/>
    <label>🤷‍♀️{selectedfriend.name} expence</label>
    <input value={paidbyfreind} disabled type="number"
    />
    <label>✅who is paying the bill</label>
    <select
    value={whoispaing}
    onChange={(e)=>setWhoIsPaying(e.target.value)}
    >
    <option value='user'>you</option>
    <option value='friend'>{selectedfriend.name}</option>
    </select>
    <Button>Split Bill</Button>
    </form>
  )
}