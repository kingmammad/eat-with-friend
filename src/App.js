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
  const [friend,setfriend]=useState(initialFriends);
  function handshow(){
    setshowaddfriend(!showaddfriend);
  }
  return (
    <div className="app">
      <div className="sidebar">
      <Friendlist friend={friend} />
      {showaddfriend&&<FormaddFriend />}
       <Button oncli={handshow}>{showaddfriend ? "close":"Add friend"}</Button>
      </div>
      <Formsplitbill />
    </div>
  )
  }
function Friendlist({friend}){
  const friends=friend;
 return (
<ul>
  {friends.map((friend)=>(
    <Friend friend={friend}  />
  ))}
</ul>
 )
}
function Friend({friend}){
  
 return (
  <li>
    <img src={friend.image}  alt={friend.name}/>
    <h3>{friend.name}</h3>
    {friend.balance<0 && (
    <p className="red">you own {friend.name} {Math.abs(friend.balance)}$</p>)}
    {friend.balance>0 && (
    <p className="green"> {friend.name}  owes you {friend.balance}$</p>)}
    {friend.balance===0 && (
    <p className="">you and {friend.name} are even</p>)}
    <Button>Select</Button>
  </li>
  
 )
}
function FormaddFriend(){
  const [name,setname]=useState('');
  const [image,setimage]=useState('https://i.pravatar.cc/48?u=499'); 
  function handaddfriend(e){
  e.preventDefault();
  const newfr={
    name,
    image,
    balance:0,
    id:crypto.randomUUID()
  }
  }

 return (
  <form onSubmit={handaddfriend}
  onChange={(e)=>setname(e.target.value)} className="form-add-friend">
  <label>🤷Friend name</label>
  <input type="text" value={name}  />
  <label>🌌Image URL</label>
  <input type="text" value={image} onChange={(e)=>setimage(e.target.value)}/>
  <Button>Add</Button>
  </form>
 )
}
function Button({children,oncli}){
  return(
 <button className="button" onClick={oncli}>{children}</button>
  )
}
function Formsplitbill(){
  return (
    <form className="form-split-bill" >
      <h2>Split a Bill with x</h2>
    <label>🤑bill value</label>
    <input type="number"/>
    <label>🤷your expence</label>
    <input type="number"/>
    <label>🤷‍♀️x expence</label>
    <input value={33} disabled type="number"/>
    <label>✅who is paying the bill</label>
    <select>
    <option value='user'>you</option>
    <option value='friend'>x</option>
    </select>
    <Button>Split Bill</Button>
    </form>
  )
}