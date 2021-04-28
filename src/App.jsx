import React from "react";
import ReactDOM from "react-dom";
import cntl from "cntl";
import Button from "./stories/Components/Button/Button";
import CollapsibleSection from "./stories/Components/CollapsibleSection/CollapsibleSection";
import Input from "./stories/Components/Input/Input";
import Dropdown from "./stories/Components/Dropdown/Dropdown";
import ProgressTracker from "./stories/Components/ProgressTracker/ProgressTracker";
import NavBar from "./stories/Components/NavBar/NavBar";
import '../index.css'; // added style might not be working (?)


const containerCN = cntl`
  mt-3
  p-3
  border
  rounded
`;

const Example = () => {
  return (
    <div className="bg-black h-full w-full flex justify-center overflow-auto">
      <div className="p-10 w-1/3">
        <p>Create a screen here!</p>
        <p>
          Below are the provided Components that will be needed. You won&apos;t
          be expected to modify these Components at all, but you may need to
          study them and pass props.
        </p>
        <div className={containerCN}>
          <p>Nav bar</p>
          <NavBar />
        </div>
        <div className={containerCN}>
          <p>Progress Tracker</p>
          <ProgressTracker
            steps={Array(5)
              .fill()
              .map((a, index) => `Step ${index + 1}`)}
          />
        </div>
        <div className={containerCN}>
          <p>Collapsible Section</p>
          <CollapsibleSection title="Section Title">
            <p>inner content</p>
          </CollapsibleSection>
        </div>
        <div className={containerCN}>
          <p>Button</p>
          <Button title="Button" />
        </div>
        <div className={containerCN}>
          <p>Input</p>
          <Input label="Label" placeholder="placeholder" />
        </div>
        <div className={containerCN}>
          <p>Dropdown</p>
          <Dropdown
            options={Array(5)
              .fill()
              .map((a, index) => ({
                label: `Option ${index + 1}`,
                value: `Option ${index + 1}`,
              }))}
          />
        </div>
      </div>
    </div>
  );
};


const initialState = {   
	name:'',   
	eSpace:'',   
	subscription:'',   
	owner: {     
		name:'',     
		email:'',     
		phone :''  
		},   
	address: {     
		street:'',     
		unit:'',     
		city:'',     
		country:'',     
		zipCode:''   
	} 
}


function reducer( state, action) {
	switch(action.type){
		case 'onChange':
			return action.payload;
		default:
			return state;
	}
}	






const App = () =>{
	const [state, dispatch] = React.useReducer(reducer, initialState)

	const onChange = (labels , type,  value) => {
		let newValue = type == 'dropdown' ? value.value.split(' ')[1] : value;
		
		function findState( mem, depth ){ 
			let currKey = labels[depth]
			let obj = {} // have to create a new object to initiate a rerender
			for (let key in mem){
				if (typeof mem[ key ] == 'object'){
					obj[ key ] = findState(mem[key], depth+1)
				} else {
					if ( key == currKey && depth+1 == labels.length){ // depth to account for same key names,  i.e. "name"
						obj[ labels[depth] ] = newValue
					} else {
						obj[key] = mem[key]	
					}
				}
			}
				return obj 
		}
		let newState = findState(state, 0)// object 'depth' is also used to index labels key path, start at 0
		dispatch({type: 'onChange', payload: newState})
	}


	return (
    <div className="bg-black h-full w-full  overflow-auto ">
        <div >
          <NavBar />
        </div>
		<div className="p-5 max-w-xl">
	<h3 className="pt-5 pr-5 pb-5"> Add New Client </h3>		
          <ProgressTracker
		className="min-w-md"
            steps={['Client Info', 'Logo', 'Branding', 'App Store']}
          />
          <CollapsibleSection title="Overview" >
		<div className="collapse-container">
          <Input label="Company Name"   
		onChange={(value)=>onChange(['name'], 'input',   value )}
		value={state.name}
		className="w-56 collapse-element"
		/>
          <Input label="eSpace Name"  
		onChange={(value)=>onChange(['eSpace'], 'input',  value )}
		value={state.eSpace}
		className="w-56 collapse-element"
		/>
          <Dropdown
		onChange={(value)=>onChange(['subscription'],'dropdown',   value )}
		value={state.subscription}
		label="Subscription"
		className="w-56 collapse-element"
		    options={Array(5)
		      .fill()
		      .map((a, index) => ({
			label: `Option ${index + 1}`,
			value: `Option ${index + 1}`,
		      }))}
          />
		</div>
	</CollapsibleSection>
          <CollapsibleSection title="Owner Information">
		<div className="collapse-container">
		  <Input label="Primary Owner"   
			onChange={(value)=>onChange( ['owner', 'name'], 'input', value )}
			value={state.owner.name}
			className="w-56 collapse-element"
			/>
		  <Input
			onChange={(value)=>onChange( [ 'owner', 'email'],'input', value )}
			value={state.owner.email}
			className="w-56 collapse-element"
			label="Primary Owner Email"
			    options={Array(5)
			      .fill()
			      .map((a, index) => ({
				label: `Option ${index + 1}`,
				value: index,
			      }))}
		  />
		  <Input label="Primary Owner Phone"  
			onChange={(value)=>onChange( [ 'owner', 'phone'], 'input', value )}
			type="tel"
			value={state.owner.phone}
			className="w-56 collapse-element"
			/>
		</div>
	</CollapsibleSection>
          <CollapsibleSection title="Location Information">
		<div className="collapse-container">
          <Input label="Street Address"  
		onChange={(value)=>onChange( [ 'address', 'street'], 'input', value )}
		value={state.address.street}
		className="w-56 collapse-element"
		/>
          <Input label="City"  
		onChange={(value)=>onChange( [ 'address', 'city'], 'input', value )}
		value={state.address.city}
		className="w-56 collapse-element"
		/>
          <Input label="Suite/Unit"  
		onChange={(value)=>onChange( [ 'address', 'unit'], 'input', value )}
		value={state.address.unit}
		className="w-56 collapse-element"
		/>
          <Dropdown
		onChange={(value)=>onChange( [ 'owner', 'country'],'dropdown', value )}
		value={state.address.country}
		className="w-56 collapse-element"
		label="Country"
		    options={Array(5)
		      .fill()
		      .map((a, index) => ({
			label: `Option ${index + 1}`,
			value: `Option ${index + 1}`,
		      }))}
          />
          <Input label="Postal Code"  
		onChange={(value)=>onChange( ['address', 'zipCode'], 'input', value )}
		value={state.address.zipCode}
		className="w-56 collapse-element"
		/>
		</div>

	</CollapsibleSection>
        </div>
		
		</div>)


}

ReactDOM.render(<App />, document.getElementById("app"));
