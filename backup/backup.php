<?php
require_once('../admin/config.php');

$s_host = DB_HOSTNAME;
$s_username = DB_USERNAME;
$s_password = DB_PASSWORD;
$s_database = DB_DATABASE;

$result = exec('mysqldump --compress --host=\'' . $s_host . '\' -u ' . $s_username . ' -p' . $s_password . ' ' . $s_database . ' > backup.sql',$output);
$result = exec('tar --remove-files -cvzf backup`date \'+%Y-%m-%d\'`.sql.tar.gz backup.sql');

$result = exec('tar -cvzf backup`date \'+%Y-%m-%d\'`.files.tar.gz ../image/data/*');
