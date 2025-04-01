<?php
header("Content-Type: application/json");
$file = '../scores.json';

// Handle GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($file)) {
        readfile($file);
    } else {
        echo json_encode(["parentScore" => 0, "kidScore" => 0, "weekStart" => ""]);
    }
    exit;
}

// Handle POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents("php://input");
    if ($json) {
        file_put_contents($file, $json);
        echo json_encode(["status" => "ok"]);
    } else {
        http_response_code(400);
        echo json_encode(["error" => "No input received"]);
    }
    exit;
}

// For any other method
http_response_code(405);
echo json_encode(["error" => "Method not allowed"]);