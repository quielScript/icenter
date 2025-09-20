export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Password Reset Request</title>
	</head>
	<body
		style="
			font-family: Arial, sans-serif;
			max-width: 600px;
			margin: 0 auto;
			padding: 0;
			box-sizing: border-box;
		"
	>
		<div style="background-color: black; color: white; padding: 2px">
			<h1 style="text-align: center; font-size: 24px">Password Reset</h1>
		</div>
		<div style="background-color: rgb(229, 229, 229); padding: 20px">
			<div style="padding: 0 20px">
				<p>Hello! {userName}</p>
				<p style="margin-bottom: 40px">
					To reset your password, please click the button below:
				</p>
				<div>
					<div style="text-align: center; margin-bottom: 40px">
						<a
							href="{resetURL}"
							style="
								background-color: black;
								color: white;
								text-decoration: none;
								padding: 10px 20px;
								border-radius: 50px;
								text-align: center;
							"
							>Reset Password</a
						>
					</div>
					<p>This link will expire in 10 minutes for security reasons.</p>
					<p>
						If you didn't request to reset your password, please ignore this
						email.
					</p>
					<p style="margin-top: 60px">Kind regards, <b>iCenter</b> Team</p>
				</div>
			</div>
		</div>
		<div style="text-align: center">
			<p style="font-style: italic; color: rgb(151, 151, 151)">
				This is an automated message, please do not reply to this email.
			</p>
		</div>
	</body>
</html>
`;

export const PASSWORD_RESET_SUCCESSFUL = `
  <!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Password Reset Successful</title>
	</head>
	<body
		style="
			font-family: Arial, sans-serif;
			max-width: 600px;
			margin: 0 auto;
			padding: 0;
			box-sizing: border-box;
		"
	>
		<div style="background-color: black; color: white; padding: 2px">
			<h1 style="text-align: center; font-size: 24px">
				Password Reset Successful
			</h1>
		</div>
		<div style="background-color: rgb(229, 229, 229); padding: 20px">
			<div style="padding: 0 20px">
				<p>Hello! {userName}</p>
				<p style="margin-bottom: 40px">
					Your password was changed! If you did not make this password reset,
					please contact us at
					<a href="mailto:exequielarco23@gmail.com">exequielarco23@gmail.com</a>
				</p>
			</div>
		</div>
		<div style="text-align: center">
			<p style="font-style: italic; color: rgb(151, 151, 151)">
				This is an automated message, please do not reply to this email.
			</p>
		</div>
	</body>
</html>

`;
