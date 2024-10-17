import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	const provider = new pdfCalcViewProvider(context.extensionUri);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(pdfCalcViewProvider.viewType, provider));
}

class pdfCalcViewProvider implements vscode.WebviewViewProvider {

	public static readonly viewType = 'pdfCalc.calcView';

	private _view?: vscode.WebviewView;

	constructor(
		private readonly _extensionUri: vscode.Uri,
	) { }

	public resolveWebviewView(
		webviewView: vscode.WebviewView,
		context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken,
	) {
		this._view = webviewView;

		webviewView.webview.options = {
			// Allow scripts in the webview
			enableScripts: true,
		};

		webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

		// webviewView.webview.onDidReceiveMessage(data => {
		// 	switch (data.type) {
		// 		case 'colorSelected':
		// 			{
		// 				vscode.window.activeTextEditor?.insertSnippet(new vscode.SnippetString(`#${data.value}`));
		// 				break;
		// 			}
		// 	}
		// });
	}

	private _getHtmlForWebview(webview: vscode.Webview) {
		return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">

				<title>PDF Calc</title>
			</head>
			<body>
				<input type="number" value="100" id="test">

				<script>
					let input = document.getElementById("test");
					input.onchange = () => {
						input.value = 420;
					}
				</script>
			</body>
			</html>`;
	}
}