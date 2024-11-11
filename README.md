Downloaded React projected from Sandbox work space is not running the application .End up with an error like (Error: error:0308010C:digital envelope routines::unsupported).

To avoid this type of error in package.json under script start add like below then the app is working fine
# "start": "react-scripts --openssl-legacy-provider start",