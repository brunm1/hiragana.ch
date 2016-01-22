<?php
require_once('config.php');

$courseId = htmlspecialchars($_POST['course_id']);
$lessonId = htmlspecialchars($_POST['lesson_id']);
$content = $_POST['content'];

$file = PAGE_DIR."lessons/$courseId-$lessonId.html";
file_put_contents($file, $content);
