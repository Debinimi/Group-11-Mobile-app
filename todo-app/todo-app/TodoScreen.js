import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Button,
  } from "react-native";
  import React, { useState } from "react";
  import { IconButton } from "react-native-paper";
  import { getAuth, signOut } from "firebase/auth";
  import Fallback from "./Fallback";
  
  const TodoScreen = () => {
    // Initialize Firebase Auth
    const auth = getAuth();
  
    // Init local states
    const [todo, setTodo] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [editedTodo, setEditedTodo] = useState(null);
  
    // Handle add todo
    const handleAddTodo = () => {
      if (todo === "") {
        return;
      }
  
      setTodoList([...todoList, { id: Date.now().toString(), title: todo }]);
      setTodo("");
    };
  
    const handleDeleteTodo = (id) => {
      const updatedTodoList = todoList.filter((todo) => todo.id !== id);
      setTodoList(updatedTodoList);
    };
  
    const handleEditTodo = (todo) => {
      setEditedTodo(todo);
      setTodo(todo.title);
    };
  
    const handleUpdatedTodo = () => {
      const updatedTodos = todoList.map((item) => {
        if (item.id === editedTodo.id) {
          return { ...item, title: todo };
        }
        return item;
      });
      setTodoList(updatedTodos);
      setEditedTodo(null);
      setTodo("");
    };
  
    // Handle logout
    const handleLogout = async () => {
      try {
        await signOut(auth);
        console.log("User logged out!");
      } catch (error) {
        console.error("Logout error:", error.message);
      }
    };
  
    // Render todo
    const renderTodos = ({ item }) => {
      return (
        <View
          style={{
            backgroundColor: "#1e90ff",
            borderRadius: 6,
            paddingHorizontal: 6,
            paddingVertical: 8,
            marginBottom: 12,
            flexDirection: "row",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 3,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 20,
              fontWeight: "800",
              flex: 1,
            }}
          >
            {item.title}
          </Text>
          <IconButton
            icon="pencil"
            iconColor="#fff"
            onPress={() => handleEditTodo(item)}
          />
          <IconButton
            icon="trash-can"
            iconColor="#fff"
            onPress={() => handleDeleteTodo(item.id)}
          />
        </View>
      );
    };
  
    return (
      <View style={{ marginHorizontal: 16 }}>
        <TextInput
          style={{
            borderWidth: 2,
            borderColor: "#1e90ff",
            borderRadius: 6,
            paddingVertical: 8,
            paddingHorizontal: 16,
          }}
          placeholder="Add a task"
          value={todo}
          onChangeText={(userText) => setTodo(userText)}
        />
  
        {editedTodo ? (
          <TouchableOpacity
            style={{
              backgroundColor: "#000",
              borderRadius: 6,
              paddingVertical: 12,
              marginVertical: 34,
              alignItems: "center",
            }}
            onPress={() => handleUpdatedTodo()}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              Save
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: "#000",
              borderRadius: 6,
              paddingVertical: 12,
              marginVertical: 34,
              alignItems: "center",
            }}
            onPress={() => handleAddTodo()}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              Add
            </Text>
          </TouchableOpacity>
        )}
  
        {/* Render todo list */}
        <FlatList data={todoList} renderItem={renderTodos} />
  
        {todoList.length <= 0 && <Fallback />}
  
        {/* Logout Button */}
        <Button title="Logout" onPress={handleLogout} color="#e74c3c" />
      </View>
    );
  };
  
  export default TodoScreen;
  
  const styles = StyleSheet.create({});
  


// import { 
//     FlatList,
//     StyleSheet, 
//     Text, 
//     TextInput, 
//     TouchableOpacity, 
//     View 
// } from "react-native"
// import React, { useState } from "react"
// import { IconButton } from "react-native-paper"
// import Fallback from "./Fallback"

// // const dummyData = [{
// //     id: "01",
// //     title: "Wash Car"
// // },{
// //     id: "02",
// //     title: "Read A book"
// // }]
// const TodoScreen = () => {

//     // Init local states
//     const[todo,setTodo] = useState("")
//     const[todoList, setTodoList] = useState([])
//     const[editedTodo, setEditedTodo] = useState(null)

//     //Handle add todo
//     const handleAddTodo = () => {

//         if(todo === ""){
//             return;
//         }

//         setTodoList([...todoList, {id: Date.now().toString(), title: todo}])
//         setTodo('');
//     }

//     const handleDeleteTodo = (id) => {
//         const updatedTodoList = todoList.filter((todo) => todo.id !== id)

//         setTodoList(updatedTodoList);
//     }

//     const handleEditTodo = (todo) => {
//         setEditedTodo(todo);
//         setTodo(todo.title);
//     }

//     const handleUpdatedTodo = () => {
//         const updatedTodos = todoList.map((item)=>{
//             if(item.id === editedTodo.id){
//                 return {...item, title: todo}
//             }
//             return item
//         })
//         setTodoList(updatedTodos);
//             setEditedTodo(null);
//             setTodo('');
//     };

//     //Render todo
//     const renderTodos = ({item ,index}) => {
//         return(
//             <View style={{
//                 backgroundColor: "#1e90ff",
//                 borderRadius: 6,
//                 paddingHorizontal: 6,
//                 paddingVertical: 8,
//                 marginBottom: 12,
//                 flexDirection: "row",
//                 alignItems: "center",
//                 shadowColor: "#000",
//                 shadowOffset: {width: 0, height: 2},
//                 shadowOpacity: 0.8,
//                 shadowRadius: 3,
//                 }}>

//                 <Text style={{
//                     color: '#fff',
//                     fontSize: 20,
//                     fontWeight: "800",
//                     flex: 1,
//                 }}>{item.title}</Text>
//                     <IconButton icon="pencil" iconColor="#fff" onPress={()=> handleEditTodo(item)}/>
//                     <IconButton icon="trash-can" iconColor="#fff" onPress={()=> handleDeleteTodo(item.id)}/>
//             </View>
//         )
//     }
//     return(
//         <View style= {{ marginHorizontal: 16}}>

//             <TextInput style={{
//                 borderWidth: 2,
//                 borderColor: "#1e90ff",
//                 borderRadius: 6,
//                 paddingVertical: 8,
//                 paddingHorizontal: 16,
                
//                 }}
//                 placeholder="Add a task"
//                 value={todo}
//                 onChangeText={(userText) => setTodo(userText)}
//                 />

//              {
//                 editedTodo ?    <TouchableOpacity 
//                 style={{
//                     backgroundColor: "#000", 
//                     borderRadius: 6, 
//                     paddingVertical: 12,
//                     marginVertical: 34,
//                     alignItems: "center",

//                     }}
//                     onPress={() => handleUpdatedTodo()}
//                     >
//                     <Text style={{
//                         color: "#fff",
//                         fontWeight: "bold",
//                         fontSize: 20,
//                     }}>
//                         Save
//                     </Text>
//                 </TouchableOpacity> :
//                    <TouchableOpacity 
//                    style={{
//                        backgroundColor: "#000", 
//                        borderRadius: 6, 
//                        paddingVertical: 12,
//                        marginVertical: 34,
//                        alignItems: "center",
   
//                        }}
//                        onPress={() => handleAddTodo()}
//                        >
//                        <Text style={{
//                            color: "#fff",
//                            fontWeight: "bold",
//                            fontSize: 20,
//                        }}>Add</Text>
//                    </TouchableOpacity>
//              }
//             {/* Render todo list bubbles_ma1n */}

//             <FlatList data = {todoList} renderItem={renderTodos}/>

//                 {todoList.length <=0 && <Fallback/>}
//         </View>
//     )
// }

// export default TodoScreen

// const styles = StyleSheet.create({})