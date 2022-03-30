// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as cp from "child_process";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "deeptour" is now active!');
 
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('deeptour.deepTour', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Create a deeptour for this project!');
		let message = '';
		let wf = '';
		if(vscode.workspace.workspaceFolders !== undefined) {
			wf = vscode.workspace.workspaceFolders[0].uri.path ;
		
			message = `YOUR-EXTENSION: folder: ${wf}` ;
		
			vscode.window.showInformationMessage(`python3.8 deeptour_lib/deeptour.py ${wf}`);
		} 
		else {
			message = "YOUR-EXTENSION: Working folder not found, open a folder an try again" ;
		
			vscode.window.showErrorMessage(message);
		}
		
		
		cp.exec(`python3.8 deeptour_lib/deeptour.py ${wf}`, (err, stdout, stderr) => {
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
			if (err) {
				console.log('error: ' + err);
			}
		});

	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
