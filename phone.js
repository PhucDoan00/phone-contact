/**
 * Sử dụng kiến thức đã học, tạo ra một ứng dụng danh bạ điện thoại, có các chức năng:
 * - Nhập dữ liệu contact (name, phone number)
 * - Sửa dữ liệu contact
 * - Xoá contact
 * - Tìm kiếm contact: có thể nhập vào tên (không dấu hoặc có dấu, chữ hoa hoặc chữ thường vẫn cho ra kết quả) hoặc 1 phần số điện thoại
 */
var readlineSync = require('readline-sync');
var fs = require('fs');

var contacts = [];

function loadData(){
  var dl=fs.readFileSync('./data.json');
  contacts=JSON.parse(dl);

}

function showData(contacts){
  for(var value of contacts)
  console.log('name:',value.name,", phone:",value.phone);
}


function save(){
  var dl=JSON.stringify(contacts);
  fs.writeFileSync('./data.json',dl,{encoding: 'utf-8'});
}

 function showMenu(){
 	console.log("1. Enter user phone info ");
 	console.log("2. Edit user data ");
 	console.log("3. Find contact ");
 	console.log("4. Delete a contact  ");
 	console.log("5. Save & Exit");
 	var option = readlineSync.question('Your choice: ');
 	switch(option){
 		case '1': 
 		inputUserInfo();
 		showMenu();
 		break;

 		case '2':
 		editUser();
 		showMenu();
 		break;

 		case '3':
 		findContact();
 		showMenu();
 		break;

 		case '4':
 		deleteContact();
 		showMenu();
 		break;

 		case '5':
 		saveExit();
 		showMenu();
 		break;

 		default:
 		console.log('Wrong option');
 		showMenu();
 		break;

 	}
 }

function inputUserInfo(){
	var name = readlineSync.question('Enter name: ');
	var phone = readlineSync.question('Enter phone: ');
	var contact = {
		name: name,
		phone: parseInt(phone),
	};
	contacts.push(contact);
	var i = 1;
	for ( var loop of contacts){
		console.log('Contact ',i++, ':' ,loop.name, loop.phone);
	}
}

function editUser(){
	var oldName = readlineSync.question('Enter name of contact need edit: ');
	for (var i = 0; i < contacts.length ; i++) 
	{
		if(contacts[i].name == oldName){
		var newName = readlineSync.question('Enter new name: ');
		contacts[i].name = newName;
		var newPhone = readlineSync.question('Enter new number: ');
		contacts[i].phone = newPhone;
		save();
		for ( var loop of contacts){
		console.log('Contact after edit: ' ,loop.name, loop.phone);
		}

	}
	else console.log('No name found!');
	
	}
}

function deleteContact(){

	var delName = readlineSync.question('Enter name to delete: ');
	for (var i = 0; i < contacts.length ; i++) 
	{
		if(contacts[i].name == delName){
		console.log ( delete contacts[i].name ); 
		
		console.log(delete contacts[i].phone);
		 
		save();
		for ( var loop of contacts){
		console.log('Contact after delete: ' ,loop.name, loop.phone);
		}

	}
	else console.log('No name found!');
	
	}

}

function findContact(){

	var inpName = readlineSync.question('Input name to find: ');
	const result = contacts.find( fName => fName.name === inpName);
	console.log(result);
}

function saveExit(){
	save();
}

 function main(){
 	showMenu();
 }

 main();