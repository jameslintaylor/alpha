import {createAction} from 'redux-actions';

export const SET_MEETING_NAME = "SET_MEETING_NAME";
export const SET_CREATOR_EMAIL = "SET_CREATOR_EMAIL";
export const ADD_INVITEE = "PUSH_INVITEE";
export const REMOVE_INVITEE = "REMOVE_INVITEE";
export const MODIFY_INVITEE = "MODIFY_INVITEE";

export const Actions = {
	setMeetingName: createAction(SET_MEETING_NAME),
	setCreatorEmail: createAction(SET_CREATOR_EMAIL),
	addInvitee: createAction(ADD_INVITEE,(name,email)=>{name,email}),
	removeInvitee: createAction(REMOVE_INVITEE,(index)=>index),
	updateInvitee: createAction(MODIFY_INVITEE,(index)=>index)
}

export const reducer = (
	state = {
		meetingName: "",
		creatorEmail: "",
		invitees: [
			/*{
				name:"",
				email:""
			}*/
		]
	},
	action
) => {
	switch(action.type){
		case SET_MEETING_NAME:
			return {
				...state,
				meetingName: action.payload
			}
		case SET_CREATOR_EMAIL:
			return {
				...state,
				creatorEmail: action.payload
			}
		case ADD_INVITEE:
			return {
				...state,
				invitees: [
					...state.invitees,
					{
						name: action.payload.name,
						email: action.payload.email
					}
				]
			}
		case REMOVE_INVITEE:
			return {
				...state,
				invitees: [
					...state.invitees.slice(0,action.payload),
					...state.invitees.slice(action.payload+1)
				]
			}
		case MODIFY_INVITEE:
			return {
				...state,
				invitees: [
					...state.invitees.slice(0,action.payload),
					{
						name: action.payload.name,
						email: action.payload.email
					},
					...state.invitees.slice(action.payload+1)
				]
			}
		default:
		return state;
	}
}