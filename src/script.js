import './style.css'
import * as THREE from 'three'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";


setTimeout(() => {
    document.querySelector(".preloader").classList.add("preloader-hidden")
// }, 5000)
}, 0)

const loader = new OBJLoader();

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('./textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg')

const bricksColorTexture = textureLoader.load('./textures/bricks/color.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('./textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('./textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('./textures/bricks/roughness.jpg')

const grassColorTexture = textureLoader.load('./textures/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('./textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('./textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('./textures/grass/roughness.jpg')

grassColorTexture.repeat.set(78, 78)
grassAmbientOcclusionTexture.repeat.set(78, 78)
grassNormalTexture.repeat.set(78, 78)
grassRoughnessTexture.repeat.set(78, 78)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping

/**
 * House
 */
// House container
const house = new THREE.Group()
scene.add(house)

// Walls
const walls = new THREE.Mesh(
    new THREE.BoxBufferGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
    })
)
walls.castShadow = true
walls.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2))
walls.position.y = 1.25
house.add(walls)

// Roof
const roof = new THREE.Mesh(
    new THREE.ConeBufferGeometry(3.5, 1, 4),
    new THREE.MeshStandardMaterial({color: '#b35f45'})
)
roof.rotation.y = Math.PI * 0.25
roof.position.y = 2.5 + 0.5
house.add(roof)

// Door
const door = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(2, 2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
    })
)
door.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2))
door.position.y = 1
door.position.z = 2 + 0.01
house.add(door)

// Bushes
const bushGeometry = new THREE.SphereBufferGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({color: '#89c854'})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.castShadow = true
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.castShadow = true
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.castShadow = true
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-0.8, 0.1, 2.2)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.castShadow = true
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(-1, 0.05, 2.6)

house.add(bush1, bush2, bush3, bush4)

// EGGs
const eggs = new THREE.Group()

const geometryEgg = new THREE.SphereGeometry(0.05, 5, 5);
for (let i = 0; i < 150; i++) {
    const materialEgg = new THREE.MeshBasicMaterial({color: "blue"})
    const angle = Math.random() * Math.PI * 2 // Random angle
    const radius = 3 + Math.random() * 6      // Random radius
    const x = Math.cos(angle) * radius        // Get the x position using cosinus
    const z = Math.sin(angle) * radius        // Get the z position using sinus
    const sphereEgg = new THREE.Mesh(geometryEgg, materialEgg);
    sphereEgg.castShadow = true
    sphereEgg.position.set(x, 0.3, z)
    sphereEgg.touch = false
    eggs.add(sphereEgg)
}
scene.add(eggs);


// Graves
const graves = new THREE.Group()
scene.add(graves)

const graveGeometry = new THREE.BoxBufferGeometry(0.6, 0.8, 0.1)
const graveMaterial = new THREE.MeshStandardMaterial({color: '#727272'})

for (let i = 0; i < 15; i++) {
    const angle = Math.random() * Math.PI * 2 // Random angle
    const radius = 3 + Math.random() * 6      // Random radius
    const x = Math.cos(angle) * radius        // Get the x position using cosinus
    const z = Math.sin(angle) * radius        // Get the z position using sinus

    // Create the mesh
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.castShadow = true

    // Position
    grave.position.set(x, 0.3, z)

    // Rotation
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4

    // Add to the graves container
    graves.add(grave)
}

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(200, 200),
    new THREE.MeshStandardMaterial({
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture
    })
)
floor.receiveShadow = true
floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2))
floor.rotation.x = -Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.3)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
moonLight.castShadow = true
moonLight.shadow.mapSize.width = 256
moonLight.shadow.mapSize.height = 256
moonLight.shadow.camera.far = 15
moonLight.position.set(4, 5, -2)
scene.add(moonLight)

// Door light
const doorLight = new THREE.PointLight('#ff7d46', 1, 7)
doorLight.castShadow = true
doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 1

doorLight.position.set(0, 2.2, 2.7)
house.add(doorLight)

/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight('#ff00ff', 1, 3)
ghost1.castShadow = true
ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 7
scene.add(ghost1)

const ghost2 = new THREE.PointLight('#00ffff', 1, 3)
ghost2.castShadow = true
ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 7
scene.add(ghost2)

const ghost3 = new THREE.PointLight('#fff', 1, 3)
ghost3.castShadow = true
ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 7
scene.add(ghost3)


let ghost3obj;
let ghost2obj;
let ghost1obj;
loader.load('model/ghost/Ghost.obj', (object) => {
        object.traverse(function (obj) {
            if (obj.isMesh) obj.material.color.set("white")
        })
        object.scale.set(0.01, 0.01, 0.01)

        ghost3obj = object.clone();
        ghost2obj = object.clone();
        ghost1obj = object.clone();

        scene.add(ghost1obj);
        scene.add(ghost2obj);
        scene.add(ghost3obj);
    }
);


/**
 * Duck
 */
let duck;
loader.load('model/duck/duck.obj', (object) => {
        duck = object
        duck.traverse((obj) => {
            if (obj.isMesh) obj.material.color.set("yellow")
        })
        duck.rotation.order = "YXZ";
        duck.castShadow = true
        duck.scale.set(0.2, 0.2, 0.2)
        duck.position.z = 9
        duck.eggDetectCollision = () => {
            let duckX = duck.position.x + 1
            let duckZ = duck.position.z + 1
            eggs.children.forEach(egg => {
                if (!egg.touch) {
                    let eggX = egg.position.x + 1
                    let eggZ = egg.position.z + 1
                    const x = eggX - duckX
                    const z = eggZ - duckZ
                    if ((x < 0.3 && x > -0.3) && (z < 0.3 && z > -0.3)) {
                        egg.visible = false
                        egg.touch = true
                        const eggHtml = document.querySelector('.eggs')
                        eggHtml.innerHTML = ++eggHtml.innerHTML
                        var audio = new Audio("https://raw.githubusercontent.com/StekolschikovV/duck-halloween/main/dist/mp3/getEgg.mp3")
                        audio.play();
                    }
                }
            })
        }
        duck.detectCollision = (ghostList) => {
            let duckX = duck.position.x + 100
            let duckZ = duck.position.z + 100
            let isCollision = false
            ghostList.forEach(ghost => {
                let ghostX = ghost.position.x + 100
                let ghostZ = ghost.position.z + 100
                const x = ghostX - duckX
                const z = ghostZ - duckZ
                if ((x < 0.5 && x > -0.5) && (z < 0.5 && z > -0.5)) {
                    isCollision = true
                }
            })

            if (isCollision) {
                const gameOverHtml = document.querySelector('.game-over')
                gameOverHtml.style.display = "block"
                gameOverHtml.style.opacity = 1

                var audio = new Audio("https://raw.githubusercontent.com/StekolschikovV/duck-halloween/main/dist/mp3/end.mp3")
                audio.play();
            }
        }
        scene.add(duck);
    }
);

/**
 * Fog
 */
const fog = new THREE.Fog('#262837', 1, 10)
// scene.fog = fog

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = -10
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setClearColor('#262837')
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()


document.addEventListener("keydown", (event) => {
    const keyCode = event.which;
    if (keyCode == 87) {
        duck.translateZ(-0.2)
    } else if (keyCode == 83) {
        duck.translateZ(+0.2)
    } else if (keyCode == 65) {
        duck.rotateY(0.2)
    } else if (keyCode == 68) {
        duck.rotateY(-0.2)
    } else if (keyCode == 32) {
        console.log("jump")
    }
}, false);


const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Ghosts
    const ghost1Angle = elapsedTime * 0.1
    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle) * 4
    ghost1.position.y = Math.sin(elapsedTime * 3)

    const ghost2Angle = -elapsedTime * 0.7
    ghost2.position.x = Math.cos(ghost2Angle) * 5
    ghost2.position.z = Math.sin(ghost2Angle) * 5
    ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

    const ghost3Angle = -elapsedTime * 0.18
    ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32))
    ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5))
    ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)


    if (ghost1obj) {
        ghost1obj.position.x = ghost1.position.x
        ghost1obj.position.y = ghost1.position.y
        ghost1obj.position.z = ghost1.position.z
    }
    if (ghost3obj) {
        ghost3obj.position.x = ghost3.position.x
        ghost3obj.position.y = ghost3.position.y
        ghost3obj.position.z = ghost3.position.z
    }
    if (ghost2obj) {
        ghost2obj.position.x = ghost2.position.x
        ghost2obj.position.y = ghost2.position.y
        ghost2obj.position.z = ghost2.position.z
    }


    if (duck) {
        camera.position.z = duck.position.z + 2
        camera.position.y = duck.position.y + 1
        camera.position.x = duck.position.x
        camera.lookAt(duck.position)
    }

    if (
        ghost1obj
        && ghost2obj
        && ghost3obj
        && duck
    ) {
        duck.detectCollision([ghost1obj, ghost2obj, ghost3obj])
        duck.eggDetectCollision()
    }


    // controls.update()


    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)

}

tick()


// setTimeout(() => {
//     var audio = new Audio("https://raw.githubusercontent.com/StekolschikovV/duck-halloween/main/dist/mp3/AddamsFamilyTheme.mp3")
// loop.loop = true
//     audio.play();
// }, 3000)
