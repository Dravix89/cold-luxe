export const VERTEX_SHADER =
  "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";

export const FRAGMENT_SHADER = `precision highp float;
uniform vec2 r; uniform float t; uniform vec2 m;

float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}

// hauteur du tissu : plis larges + ondes secondaires + frémissement porté par des rafales
float h(vec2 p){
  float s=t*.40;
  vec2 w=p;
  w+=.60*vec2(sin(p.y*.75+s*.62), cos(p.x*.68-s*.55));
  w+=.34*vec2(sin(w.y*1.45-s*.85+1.3), cos(w.x*1.25+s*.75));
  w+=.14*vec2(sin(w.y*2.9+s*1.25), cos(w.x*2.6-s*1.05));
  float a=sin(w.x*1.00+w.y*.52-s*.80)*.62;
  float b=sin(w.x*.40-w.y*1.10+s*.55)*.66;
  float c=sin(w.x*1.85+w.y*1.45-s*1.15)*.17;
  float gust=smoothstep(-.4,.9,sin(p.x*.55+p.y*.25-s*.9));
  float d=sin(w.x*4.2-w.y*3.1+s*2.2)*.035*gust;
  float e=sin(w.x*6.5+w.y*5.2-s*2.8)*.015*gust;
  return a+b+c+d+e;
}

void main(){
  vec2 uv=(gl_FragCoord.xy-.5*r)/r.y*2.6;
  float e=.003;
  float h0=h(uv);
  float hx=(h(uv+vec2(e,0.))-h(uv-vec2(e,0.)))/(2.*e);
  float hy=(h(uv+vec2(0.,e))-h(uv-vec2(0.,e)))/(2.*e);
  vec3 n=normalize(vec3(-hx*.40,-hy*.40,1.));
  vec3 v=vec3(0.,0.,1.);
  vec2 ml=m-.5;

  vec3 rf=vec3(0.,0.,-1.)+2.*n.z*n;
  vec2 q=rf.xy;
  float box1=exp(-dot(q-vec2(-.30+ml.x*.5,.38+ml.y*.5),q-vec2(-.30+ml.x*.5,.38+ml.y*.5))*5.5);
  float box2=exp(-dot(q-vec2(.52,-.28),q-vec2(.52,-.28))*9.);
  float yy=q.y-.06-ml.y*.35;
  float strip=exp(-yy*yy*34.)*exp(-q.x*q.x*1.3);

  vec2 g=vec2(hx,hy);
  vec3 T=normalize(vec3(-g.y,g.x,0.)+vec3(1e-4,0.,0.));
  vec3 l1=normalize(vec3(-.5+ml.x*.8,.65+ml.y*.8,.75));
  vec3 H1=normalize(l1+v);
  float tn=dot(T,H1);
  float aniso=pow(sqrt(max(1.-tn*tn,0.)),44.);
  float diff=max(dot(n,l1),0.);

  float fres=.04+.96*pow(1.-max(n.z,0.),4.);
  float ao=mix(.55,1.,smoothstep(-1.3,1.1,h0));

  vec3 col=vec3(.006,.007,.011);
  col+=vec3(.022,.024,.032)*diff;
  col+=vec3(.62,.68,.82)*box1*.20;
  col+=vec3(.45,.50,.72)*box2*.12;
  col+=vec3(.80,.84,.95)*strip*.16;
  col+=vec3(.85,.88,1.)*aniso*diff*.10;
  col+=vec3(.55,.50,.62)*fres*.10;
  col*=ao;

  col=(col*(2.51*col+.03))/(col*(2.43*col+.59)+.14);
  col=pow(col,vec3(.95));

  vec2 vc=gl_FragCoord.xy/r-.5;
  col*=1.-dot(vc,vc)*.9;

  col+=(hash(gl_FragCoord.xy)-.5)*.006;
  gl_FragColor=vec4(col,1.);
}`;
