<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $firstName = htmlspecialchars($_POST['firstName']);
    $lastName = htmlspecialchars($_POST['lastName']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    // Email details
    $to = "ali.haroon@colorado.edu";
    $fullName = $firstName . ' ' . $lastName;
    $headers = "From: " . $email . "\r\n" .
               "Reply-To: " . $email . "\r\n" .
               "Content-Type: text/html; charset=UTF-8";

    // Compose the email content
    $emailContent = "<h2>Contact Form Submission</h2>";
    $emailContent .= "<p><strong>Name:</strong> $fullName</p>";
    $emailContent .= "<p><strong>Email:</strong> $email</p>";
    $emailContent .= "<p><strong>Subject:</strong> $subject</p>";
    $emailContent .= "<p><strong>Message:</strong><br>$message</p>";

    // Send the email
    if (mail($to, $subject, $emailContent, $headers)) {
        echo "Thank you for your message, $firstName. We will get back to you shortly.";
    } else {
        echo "Sorry, something went wrong. Please try again later.";
    }
} else {
    echo "Invalid request method.";
}
?>
