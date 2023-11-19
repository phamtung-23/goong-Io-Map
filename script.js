//get keys in https://account.goong.io/keys
var maptiles_key = '9mCaMwiQrQ47CpRYryXe8pUsY0RYnlQKf9UlVE5J';
var api_key = 'c2LzYcVXwV1jDs3R3wPPLB0W5QAm9tZBunLJyNSD';

goongjs.accessToken = maptiles_key;
var map = new goongjs.Map({
  container: 'map',
  style: 'https://tiles.goong.io/assets/goong_light_v2.json', // stylesheet location
  center: [105.83991, 21.02800], // starting position [lng, lat]
  zoom: 5,

});
// Add the control to the map.
map.addControl(
  new GoongGeocoder({
    accessToken: api_key,
    goongjs: goongjs
  })
);
// add menu style map
var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');
function switchLayer(layer) {
  var styleURL = layer.target.value;
  map.setStyle(styleURL);
}
for (var i = 0; i < inputs.length; i++) {
  inputs[i].onclick = switchLayer;
}

// draw oil lots
const flightPlanCoordinates = [
  [105.820, 18.729],
  [107.026, 18.729],
  [107.026, 19.177],
  [105.820, 19.177],
  [105.820, 18.729],
];
const flightPlanCoordinates1 = [
  [105.820, 19.177],
  [107.026, 19.177],
  [107.020, 19.377],
  [107.520, 19.677],
  [106.020, 19.677],
  [105.820, 19.477],
  [105.820, 19.177],
];
const flightPlanCoordinates2 = [
  [106.020, 19.677],
  [107.520, 19.677],
  [107.500, 20.477],
  [106.800, 20.477],
  [106.020, 19.677],

];
const flightPlanCoordinates3 = [
  [107.200, 20.477],
  [107.500, 20.477],
  [107.520, 19.677],
  [107.900, 20.220],
  [107.700, 21.120],
  [107.200, 20.477],

];

const flightPlanCoordinates4 = [
  [109.070, 14.929],
  [110.180, 14.929],
  [110.191, 14.323],
  [109.257, 14.323],
  [109.070, 14.929]

];

const goldenStar1 = [
  [109.070, 8.029],
  [109.147, 7.973],
  [109.257, 8.223],
  [109.157, 8.223],
  [109.070, 8.029]
];

const goldenStar2 = [

  [109.270, 8.029],
  [109.337, 7.980],
  [109.437, 8.080],
  [109.497, 8.223],
  [109.397, 8.223],
  [109.270, 8.029]
];
const flightPlanCoordinates5 = [
  [103.010, 7.829],
  [103.007, 7.501],
  [103.407, 7.401],
  [103.887, 7.001],
  [105.887, 6.201],
  [104.507, 6.851],
  [103.010, 7.829]
];
const line = [
  [104.000, 30.000],
  [104.000, 2.000],
];
const line1 = [
  [106.000, 30.000],
  [106.000, 2.000],
];
const line2 = [
  [108.000, 30.000],
  [108.000, 2.000],
];
const line3 = [
  [110.000, 30.000],
  [110.000, 2.000],
];
const line4 = [
  [112.000, 30.000],
  [112.000, 2.000],
];
const line5 = [
  [114.000, 30.000],
  [114.000, 2.000],
];
const pipeline = [
  [104.880, 8.856],
  [104.604, 8.849],
  [103.820, 7.191]
];

let polylines = [
  flightPlanCoordinates,
  flightPlanCoordinates1,
  flightPlanCoordinates2,
  flightPlanCoordinates3,
  flightPlanCoordinates4,
  goldenStar1,
  goldenStar2,
  flightPlanCoordinates5,
  
]

let allLine = [
  line,
  line1,
  line2,
  line3,
  line4,
  line5,
]
var hoveredStateId = null;


map.on('load', function () {
  // Add GeoJSON data
  map.addSource('source', {
    'type': 'geojson',
    'data': {
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'type': 'Polygon',
        'coordinates': [
          [
            [105.820, 19.177],
            [107.026, 19.177],
            [107.020, 19.377],
            [107.520, 19.677],
            [106.020, 19.677],
            [105.820, 19.477],
            [105.820, 19.177],
          ]
        ]
      }
    }
  });

  // Load an image to use as the pattern
  map.loadImage(
    'https://res.cloudinary.com/dyndwt2bp/image/upload/v1698170466/upload/tesst_ozfgxu.png',
    function (err, image) {
      // Throw an error if something went wrong
      if (err) throw err;

      // Declare the image
      map.addImage('pattern', image);

      // Use it
      map.addLayer({
        'id': 'pattern-layer',
        'type': 'fill',
        'source': 'source',
        'paint': {
          'fill-pattern': 'pattern'
        },
      });
    }
  );
});

map.on('load', function () {
  for (let i = 0; i < polylines.length; i++) {
    let source = `route${i}`
    map.addSource(source, {
      'type': 'geojson',
      'data': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
          'type': 'LineString',
          'coordinates': polylines[i]
        }
      }
    });
    map.addLayer({
      'id': `${source}-fills`,
      'type': 'fill',
      'source': source,
      'layout': {},
      'paint': {
        'fill-color': '#999999',
        'fill-opacity': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          1,
          0
        ]
      }
    });
    map.addLayer({
      'id': source,
      'type': 'line',
      'source': source,
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-color': '#417b96',
        'line-width': 1
      }
    });
    map.on('mousemove', `${source}-fills`, function (e) {
      console.log(e.features[0].layer.id)
      map.addLayer({
        'id': `${source}-fills-hover`,
        'type': 'fill',
        'source': source,
        'layout': {},
        'paint': {
          'fill-color': '#F8F8FF',
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            1,
            0.5
          ]
        }
      });
    });
  
    // When the mouse leaves the state-fill layer, update the feature state of the
    // previously hovered feature.
    map.on('mouseleave', `${source}-fills`, function () {
      map.removeLayer(`${source}-fills-hover`);
    });
  }
  // for (let i = 0; i < allLine.length; i++) {
  //   let sourceOil = `route${i}_oil`
  //   map.addSource(sourceOil, {
  //     'type': 'geojson',
  //     'data': {
  //       'type': 'Feature',
  //       'properties': {},
  //       'geometry': {
  //         'type': 'LineString',
  //         'coordinates': allLine[i]
  //       }
  //     }
  //   });
  //   map.addLayer({
  //     'id': `${sourceOil}-fills-oil`,
  //     'type': 'fill',
  //     'source': sourceOil,
  //     'layout': {},
  //     'paint': {
  //       'fill-color': '#999999',
  //       'fill-opacity': [
  //         'case',
  //         ['boolean', ['feature-state', 'hover'], false],
  //         1,
  //         0
  //       ]
  //     }
  //   });
  //   map.addLayer({
  //     'id': sourceOil,
  //     'type': 'line',
  //     'source': sourceOil,
  //     'layout': {
  //       'line-join': 'round',
  //       'line-cap': 'round'
  //     },
  //     'paint': {
  //       'line-color': '#417b96',
  //       'line-width': 1
  //     }
  //   });
  // }
  map.addSource('pipeline', {
    'type': 'geojson',
    'data': {
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'type': 'LineString',
        'coordinates': pipeline
      }
    }
  });
  map.addLayer({
    'id': 'pipeline',
    'type': 'line',
    'source': 'pipeline',
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
      'line-color': '#EE0000',
      'line-width': 2
    }
  });

});

function toggleSideOff(id) {
  var elem = document.getElementById(id);
  var classes = elem.className.split(' ');
  var collapsed = classes.indexOf('collapsed') !== -1;
  var icon = elem.querySelector('.icon-off-toggle')
    ;

  var padding = {};
  padding[id] = 0;
  classes.push('collapsed');
  map.easeTo({
    padding: padding,
    duration: 1000
  })
  // Update the class list on the element
  icon.remove()
  elem.className = classes.join(' ');
}
function toggleSideOn(id, marker) {
  var elem = document.getElementById(id);
  var classes = elem.className.split(' ');
  var content = elem.querySelector('.sidebar-content')

  var collapsed = classes.indexOf('collapsed') !== -1;

  var padding = {};

  if (collapsed) {
    // Remove the 'collapsed' class from the class list of the element, this sets it back to the expanded state.
    classes.splice(classes.indexOf('collapsed'), 1);

    padding[id] = 300; // In px, matches the width of the sidebars set in .sidebar CSS class
    map.easeTo({
      padding: padding,
      duration: 1000 // In ms, CSS transition duration property for the sidebar matches this value
    });
  }
  content.innerHTML = `
    <div class="m-3 main-content-sidebar" data-id="${marker.properties.id}">
      <h3>${marker.properties.name}</h3>
      <img class="rounded" width="100%" src="${marker.properties.image}">
      <div class="mt-2"><b>Thời gian: </b>${marker.properties.time}</div>
      <div class="mt-2"><b>Địa điểm: </b>${marker.properties.address}</div>
      <div class="mt-2"><b>Dịch vụ: </b>${marker.properties.service}</div>
      <div class="mt-2"><b>Khách hàng: </b>${marker.properties.infoCustomer}</div>
      <div class="mt-2"><b>Vị trí: </b> ${marker.geometry.coordinates[0]}, ${marker.geometry.coordinates[1]}</div>
      <div class="mt-2"><b>Phạm Vi:</b> ${marker.properties.description}</div>
      <div class="gallery">
        <div class="w3-content w3-display-container">
          <div class="gallery-img"></div>
          <div class="w3-center w3-container w3-section w3-large w3-text-white w3-display-bottommiddle" style="width:100%">
            <div class="w3-left w3-hover-text-khaki" onclick="plusDivs(-1)">&#10094;</div>
            <div class="w3-right w3-hover-text-khaki" onclick="plusDivs(1)">&#10095;</div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center align-items-center">
      <div class="sidebar-toggle icon-off-toggle rounded-rect right" onclick="toggleSideOff('right')">
        &rarr;
      </div>
    </div>
    `;
  const gallery = document.querySelector(".gallery-img");
  console.log(gallery);
  let html = ``
  const imageArray = marker.properties.gallery;
  for (let i = 0; i < imageArray.length; i++) {
    html += ` <img class="mySlides w3-animate-right" src="${imageArray[i]}">`
  }
  console.log('test')
  gallery.innerHTML = html
  console.log(gallery);

  // showDivs(slideIndex);
  elem.className = classes.join(' ');
}

var geojson = {
  'type': 'FeatureCollection',
  'features': [
    {
      'type': 'Feature',
      'properties': {
        'id': 1,
        'message': 'Foo',
        'iconSize': [40, 40],
        'name': "Dàn đầu giếng Quảng Ngãi",
        'image': "static/SVDN Offshore_adjusted (1).jpg",
        'address': "108 Squirrel Ln &#128063;, Menlo Park, CA",
        'description': "Dự án Hải Dương được phát triển bởi PetroVietnam và Công ty Dầu khí Tư nhân Thái Bình Dương (PVEP POC). Mục tiêu của dự án này là thăm dò, khoan và khai thác dầu từ các mỏ nằm dưới đáy biển ở Vịnh Bắc Bộ.",
        'time': "11/2017 – 10/2021",
        'infoCustomer': "Idemitsu Kosan Co., Ltd",
        'service': "Cơ khí dầu khí",
        'gallery': [],
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [106.88351194871855, 19.978595727381222]
      }
    },
    {
      'type': 'Feature',
      'properties': {
        'id': 2,
        'message': 'Bar',
        'iconSize': [40, 40],
        'name': "Dàn đầu giếng (WHP) Đông Đô",
        'image': 'static/SVDN Offshore_adjusted (1).jpg',
        'address': "Thanh Hóa",
        'description': "Mỏ Đông Đô khai thác dòng dầu đầu tiên   Ngày 7/07, giàn khai thác Đông Đô thuộc cụm mỏ Thăng Long - Đông Đô, nằm trong Lô 01-97&02-97 đã cho dòng dầu đầu tiên (First Oil).Đây là dự án do Nhà điều hành Lam Sơn JOC (LSJOC), trong đó Tổng Công ty Thăm dò Khai thác dầu khí (PVEP) tham gia 50% và Petronas của Malaysia tham gia 50%, làm chủ đầu tư. ",
        'time': "11/2017 – 10/2021",
        'infoCustomer': "Idemitsu Kosan Co., Ltd",
        'service': "Cơ khí dầu khí",
        'gallery': [],
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [106.43527442155671, 19.37238928233252]
      }
    },
    {
      'type': 'Feature',
      'properties': {
        'id': 3,
        'message': 'Baz',
        'iconSize': [40, 40],
        'name': "Dàn đầu giếng (WHP) Thăng Long",
        'image': "static/SVDN Offshore_adjusted (1).jpg",
        'address': "Nghệ An",
        'description': "Toàn bộ công trình cụm mỏ Thăng Long - Đông Đô bao gồm 22 giếng khoan phát triển, 2 giàn đầu giếng (WHP) tại mỏ Thăng Long và Đông Đô, 1 tàu FPSO công suất xử lý 18.000 thùng dầu/ngày, 13.000 thùng nước/ngày, hệ thống bơm ép nước 15.000 thùng/ngày và hệ thống bơm ép khí 18 triệu bộ khối/ngày.",
        'time': "11/2017 – 10/2021",
        'infoCustomer': "Idemitsu Kosan Co., Ltd",
        'service': "Cơ khí dầu khí",
        'gallery': [],
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [109.75644094435764, 14.65489530274547]
      }
    },
    {
      'type': 'Feature',
      'properties': {
        'id': 4,
        'message': 'Baz',
        'iconSize': [40, 40],
        'name': "DỰ ÁN SAO VÀNG – ĐẠI NGUYỆT",
        'image': "static/SVDN Offshore_adjusted (1).jpg",
        'address': "Việt Nam",
        'time': "11/2017 – 10/2021",
        'infoCustomer': "Idemitsu Kosan Co., Ltd",
        'service': "Cơ khí dầu khí",
        'description': "Thiết kế, mua sắm, vận chuyển, lắp đặt và chạy thử giàn xử lý trung tâm Sao Vàng, giàn đầu giếng Đại Nguyệt.",
        'gallery': [
          "static/16 Jun 20-3.JPG",
          "static/31 May 20-3.JPG",
          "static/SVDN - SV CPP Loadout (1).jpg",
          "static/SVDN - SV CPP Loadout (2).jpg",
          "static/SVDN - SV CPP Loadout (3).jpg",
          "static/SVDN - SV CPP Loadout (4).jpg",
          "static/SVDN - SV CPP Loadout (5).jpg",
          "static/SVDN - SV CPP Loadout (6).jpg",
          "static/SVDN - SV CPP Loadout (7).JPG",
          "static/SVDN CPP Jacket (1).JPG",
          "static/SVDN CPP Jacket (2).JPG",
          "static/SVDN CPP Jacket Fabrication.JPG",
          "static/SVDN CPP Jacket Loadout.JPG",
          "static/SVDN CPP Jacket Sailaway.JPG",
          "static/SVDN CPP Topsides (1).JPG",
          "static/SVDN CPP Topsides (2).jpg",
          "static/SVDN CPP Topsides (3).JPG",
          "static/SVDN CPP Topsides (4).JPG",
        ],
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [109.14450384242726, 8.079985918665942]
      }
    }
  ]
};


// add markers to map
geojson.features.forEach(function (marker) {
  // create a DOM element for the marker
  var el = document.createElement('div');
  el.className = 'marker';
  el.innerHTML = `<img src="static/icon-oil-rig.png" width="35px"/>`


  el.addEventListener('click', function () {
    toggleSideOn('right', marker)
    console.log("click");
  });

  let popupHtml = `
    <div class='property'>
      <div class="icon">
        <img src="static/icon-oil-rig.png" width="100px">
      </div>
      <div class="details">
          <div class="price">${marker.properties.name}</div>
          <div class="address">${marker.properties.address}</div>
          <div class="features">
          <div>
              <span>lat</span>
              <span>${marker.geometry.coordinates[0]}</span>
          </div>
          <div>
              <span>lng</span>
              <span>${marker.geometry.coordinates[1]}</span>
          </div>
          </div>
      </div>
    </div>
  `;
  var popup = new goongjs.Popup({ offset: 25, maxWidth: '500px' })
    .setHTML(popupHtml)

  // add marker to map
  new goongjs.Marker(el)
    .setLngLat(marker.geometry.coordinates)
    .setPopup(popup)
    .addTo(map);

  popup.on('close', function (e) {
    console.log('popup', e);
    if (marker.properties.id == $('.main-content-sidebar').data('id')) {
      toggleSideOff('right')
    }
  });
});

// ======== create slider inside the information tab ================
var slideIndex = 1;
function plusDivs(n) {
  showDivs(slideIndex += n);
}
function currentDiv(n) {
  showDivs(slideIndex = n);
}
function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = x.length }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex - 1].style.display = "block";
}
setInterval(() => {
  plusDivs(1);
}, 3500);



