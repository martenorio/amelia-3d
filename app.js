//variables for setup
let container;
let camera;
let renderer;
let scene;
let model3d;

function init(){
    container = document.querySelector('.scene');

    //create scene
    scene = new THREE.Scene();

    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 1000;
    // camera setup
    camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
    // camera.position.set(-160,50,500); //girl
    camera.position.set(-2,1.5,9);

    const ambient = new THREE.AmbientLight(0x404040,2);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff,2)
    light.position.set(10,10,10);
    scene.add(light);
    
    //renderer
    renderer = new THREE.WebGLRenderer({antialias:true,alpha:true});
    renderer.setSize(container.clientWidth,container.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    //load model
    let loader = new THREE.GLTFLoader();
    loader.load("./3d/pchololive/scene.gltf",function(gltf){
        scene.add(gltf.scene);
        model3d = gltf.scene.children[0];
        animate()
    })
}

function animate(){
    requestAnimationFrame(animate);
    model3d.rotation.z += 0.005;
    renderer.render(scene,camera);
}

init();

function onWindowResize(){
    console.log('onevent')
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth,container.clientHeight);
}

window.addEventListener('resize',onWindowResize);