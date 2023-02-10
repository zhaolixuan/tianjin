export default {
  name: 'Shader',
  finalPass: {
    vertexShader: [
      'varying vec2 vUv;',
      'void main(){',
      'vUv = uv;',
      'gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
      '}'

    ].join('\n'),
    fragmentShader: [
      'uniform sampler2D baseTexture;',
      'uniform sampler2D bloomTexture;',
      'varying vec2 vUv;',
      'vec4 getTexture( sampler2D texelToLinearTexture ) {return mapTexelToLinear( texture2D( texelToLinearTexture , vUv ) );}',

      'void main(){',
      'gl_FragColor = ( getTexture( baseTexture ) + vec4( 1.0 ) * getTexture( bloomTexture ) );',
      '}'
    ].join('\n')
  },
  circle: {
    vertexShader: [
      'varying vec2 vUv;',
      'void main(){',
      'vUv = uv;',
      'gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
      '}'
    ].join('\n'),
    fragmentShader: `
    varying vec2 vUv;
    uniform float random;
    uniform float time;
    uniform vec3 color;
    uniform float opacity;
    float radius = 0.31;
    float fct(vec2 p, float r){return (1.-step(radius,r)) * 0.5* r / radius ;}
    float d2y(float d){return 1./(0.2+d);}
    float circle(vec2 p, float r){
    float d=distance(r, radius);
    return d2y(100.*d);
    }
    void main( void ) {
    radius = .11 + radius * abs(sin( (random + time) ));
    vec2 position = vUv - vec2(.5);
    position/=cos(1.5*length(position));
    float y  = 0.;
    
    float dc = length(position);
    
    y+=fct(position, dc);
    y+=circle(position, dc);
    
    y=pow(y,1.5);
    if(dc / radius > 1.){discard;}
    gl_FragColor = vec4( color.x,color.y,color.z , y);}`
  },
  flyline: {
    vertexShader: `
      varying vec2 vUv;
      void main(){
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }`,
    fragmentShader: `
      uniform float time;
      uniform float linelen;
      uniform float opacity;
      uniform float random;
      uniform vec3 color;
      uniform vec3 lightcolor;
      varying vec2 vUv;
      void main( void ) {
        float dis = fract( time+random );
        float opa = opacity;
        vec3 vColor = color;
        if( abs(dis-vUv.x) >= linelen ){
          opa = 0.2;
        } else {
          if(dis > vUv.x){ //尾部渐变
            opa = opacity - (dis-vUv.x)/(linelen*1.2);
            if(opa >= 0.9){
              //头部加亮
              vColor = lightcolor;
              opa = 1.0;
            } else if(opa < 0.2){
              opa = 0.2;
            }
          } else if(dis < vUv.x){ //前部隐藏
            opa = 0.2;
          }
        }
        gl_FragColor = vec4(vColor, opa);
      }`
  },
  road: {
    vertexShader: `
      varying vec2 vUv;
      void main(){
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }`,
    fragmentShader: `
      uniform float time;
      uniform float linelen;
      uniform float opacity;
      uniform float random;
      uniform vec3 color;
      varying vec2 vUv;
      void main( void ) {
        float dis = fract( time+random );
        float opa = opacity;
        if( abs(dis-vUv.x) >= linelen ){
          opa = 0.0;
        } else {
          if(dis > vUv.x){ //尾部渐变
            opa = opacity - (dis-vUv.x)/(linelen*1.2);
            // if(opa < 0.2){
            //   opa = 0.2;
            // }
          } else if(dis < vUv.x){ //前部隐藏
            opa = 0.0;
          }
        }
        if(opa == 0.0){discard;}
        gl_FragColor = vec4(color, opa);
      }`
  },
  verticalline: {
    vertexShader: `
      varying vec2 vUv;
      void main(){
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }`,
    fragmentShader: `
      uniform float time;
      uniform float linelen;
      uniform float opacity;
      uniform float random;
      uniform vec3 color;
      uniform vec3 lightcolor;
      varying vec2 vUv;
      void main( void ) {
        float dis = fract( time+random );
        float opa = opacity;
        vec3 vColor = color;
        if( abs(dis-vUv.x) >= linelen ){
          opa = 0.2;
        } else {
          if(dis > vUv.x){ //尾部渐变
            opa = opacity - (dis-vUv.x)/(linelen*1.2);
            if(opa > 0.95){
              // 头部加亮
              vColor = lightcolor;
              // opa = 1.0;
            } else if(opa < 0.2){
              opa = 0.2;
            }
          } else if(dis < vUv.x){ //前部隐藏
            opa = 0.2;
          }
        }
        gl_FragColor = vec4(vColor, opa);
      }`
  }
}
