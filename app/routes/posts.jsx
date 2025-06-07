import { useRef, useState, useContext, useEffect, createContext } from "react";
import "./styles.css"
import { Form, useLoaderData } from "react-router";
import { connect } from "../../postsfile/authanddb";

const UserContext = createContext(null);

export async function loader({request}) {
    
    const messagelist = await connect(`
       select *
       from posts 
    `);

    // console.log(messagelist);
    return messagelist;
}

// export const shouldRevalidate = () => false;

export async function action({request}) {
    const formData = await request.formData();
    
    const name = formData.get("name");
    const message = formData.get("content");

    connect(`
        insert into posts (name, message)
        values ('${name}', '${message}')
    `);
}

export default function HomePage() {


    return (<UserContext.Provider value={{}}>

        <h1 style={{ textAlign: "center", marginTop: "1em", marginBottom: "1em", fontSize: "2em", color: "white", userSelect: "none" }}>Posts</h1>

        <PostInputContainer></PostInputContainer>
    
    </UserContext.Provider>)
}

function PostInputContainer({loaderData}) {
    
    const [inputactive, setInputActive] = useState(false);
    const postRef = useRef(null);
    const inputRef = useRef(null);
    const messagelist = useLoaderData();
    
    const handleclick = (e) => {
        
        if (e.target.id == "1" || e.target.id == "2") {
            return null;
        }
        
        if (!inputactive) {
            setInputActive(true);
            postRef.current.classList.add("active");
            inputRef.current.classList.add("active");
        } else {
            setInputActive(false);
            postRef.current.classList.remove("active");
            inputRef.current.classList.remove("active");
        }
    }
    
    return <>
        <div ref={inputRef} className="inputscreen" onClick={handleclick}>
            <Form method="post">
                
                <h4 id="1" className="label">Name:</h4>
                <input id="2" type="text" name="name" className="nameinput"/>
                <textarea id="1" name="content" className="messageinput"></textarea>
                <button id="1" type="submit" className="postbutton">Post</button>
            </Form>
        </div>
        
        <div ref={postRef} className="posts" onClick={handleclick}>
            <ul className="Apostcontainer">
                {
                    messagelist.map((post) => <Post key={post.id} name={post.name} message={post.message}></Post>)
                }
            </ul>
        </div>
        
    </>
}

function Post(props) {

    return <li key={props.id} className="Apost">
                <p className="Apostname">{props.name}</p>
            {props.message}</li>
}