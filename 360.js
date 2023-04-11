<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.min.js"></script>
    <script>
        // Three.js variables
        var camera, scene, renderer;
        var photoMesh;

        // File input element
        var fileInput = document.getElementById('fileInput');
        fileInput.addEventListener('change', handleFileSelect, false);

        // Mouse/touch variables
        var isMouseDown = false;
        var startX = 0;
        var startY = 0;

        // Function to handle file selection
        function handleFileSelect(event) {
            var file = event.target.files[0];

            // Check if file is an image
            if (file.type.indexOf('image') === 0) {
                var reader = new FileReader();
                reader.onload = function(event) {
                    var image = new Image();
                    image.src = event.target.result;
                    image.onload = function() {
                        showPhoto(image);
                    };
                };
                reader.readAsDataURL(file);
            } else {
                alert('Please select an image file.');
            }
        }

        // Function to show the 360 photo
        function showPhoto(image) {
            // Remove existing photo if any
            if (photoMesh) {
                scene.remove(photoMesh);
                photoMesh.geometry.dispose();
                photoMesh.material.dispose();
                photoMesh = null;
            }

            // Create a new texture from the image
            var texture = new THREE.Texture(image);
            texture.needsUpdate = true;

            // Create a sphere geometry to display the photo
            var geometry = new THREE.SphereGeometry(5, 60, 40);
            var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
            photoMesh = new THREE.Mesh(geometry, material);

            // Add the photo mesh to the scene
            scene.add(photoMesh);
        }

        // Initialize Three.js scene
        function init() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.getElementById('viewer').appendChild(renderer.domElement);

            camera.position.z = 0.01;

            // Add event listeners for window resize, mouse down/up/move, and touch start/move/end
            window.addEventListener('resize', onWindowResize, false);
            renderer.domElement.addEventListener('mousedown', onMouseDown, false);
            renderer.domElement.addEventListener('mouseup', onMouseUp, false);
            renderer.domElement.addEventListener('mousemove', onMouseMove, false);
            renderer.domElement.addEventListener('touchstart', onTouchStart, false);
            renderer.domElement.addEventListener('touchmove', onTouchMove, false);
            renderer.domElement.addEventListener('touchend', onTouchEnd, false);
        }

        // Update Three.js renderer size on window resize
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        // Function to handle mouse down
            function onMouseDown(event) {
            isMouseDown = true;
            startX = event.clientX || event.touches[0].clientX;
            startY = event.clientY || event.touches[0].clientY;
            }
            
            // Function to handle mouse up
            function onMouseUp(event) {
            isMouseDown = false;
            }
            
            // Function to handle mouse move
            function onMouseMove(event) {
            if (isMouseDown) {
            var deltaX = (event.clientX || event.touches[0].clientX) - startX;
            var deltaY = (event.clientY || event.touches[0].clientY) - startY;
            
            photoMesh.rotation.y += deltaX * 0.01;
            photoMesh.rotation.x += deltaY * 0.01;
            
            startX = event.clientX || event.touches[0].clientX;
            startY = event.clientY || event.touches[0].clientY;
            }
            }
            
            // Function to handle touch start
            function onTouchStart(event) {
            event.preventDefault();
            onMouseDown(event);
            }
            
            // Function to handle touch move
            function onTouchMove(event) {
            event.preventDefault();
            onMouseMove(event);
            }
            
            // Function to handle touch end
            function onTouchEnd(event) {
            event.preventDefault();
            onMouseUp(event);
            }
            
            // Function to animate the scene
            function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            }
            
            // Call init and animate functions to start the application
            init();
            animate();
            
            // ... previous code ...
            
// Function to start auto-scroll
function startAutoScroll() {
    autoScrollInterval = setInterval(function() {
        photoMesh.rotation.y += 0.01; // Adjust the rotation speed as needed
    }, 16); // 60 frames per second
}

// Function to stop auto-scroll
function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

// Call startAutoScroll() to start auto-scrolling
startAutoScroll();
