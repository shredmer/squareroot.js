/*

Squareroot.js
A micro 3d engine for Canvas and CSS

Version 1
Build 37 | Wed Jan 23 11:52:53 2013

*/
var SQR=function(){if(typeof window.Float32Array=="undefined")window.Float32Array=window.Array;return{DYNAMIC_TRANSFORM:0,STATIC_TRANSFORM:1,twoPI:Math.PI*2,deg2rad:Math.PI/180,rad2deg:180/Math.PI,supportsCss3d:!1,usePreserve3d:!1}}();SQR.BUILD=37;SQR.Color=function(a,c,b,d){this.set=function(a,c,b,d){this.hue=a;this.saturation=c;this.lightness=b;this.alpha=d};this.applyLight=function(a){return SQR.Color.hsl(this.hue,this.saturation,this.lightness-60+80*a,this.alpha)};this.toHSLString=function(){return SQR.Color.hsl(this.hue,this.saturation,this.lightness,this.alpha)};this.set(a,c,b,d)};SQR.Color.hsl=function(a,c,b,d){return d?"hsla("+a+","+c+"%,"+b+"%, "+d+")":"hsl("+a+","+c+"%,"+b+"%)"};SQR.Interpolation={bezierPosition:function(a,c,b,d,e){return c*(1-a)*(1-a)*(1-a)+b*3*a*(1-a)*(1-a)+d*3*a*a*(1-a)+e*a*a*a},bezierVelocity:function(a,c,b,d,e){return 3*b-3*c+2*(3*c-6*b+3*d)*a+3*(-c+3*b-3*d+e)*a*a},smoothStep:function(a,c,b){if(b<=a)return a;if(b>=c)return c;b=(b-a)/(c-a);return a+(3*b*b-2*b*b*b)*(c-a)},quadIn:function(a){return a*a},quadOut:function(a){return a*(2-a)},quadInOut:function(a){return(a*=2)<1?0.5*a*a:-0.5*(--a*(a-2)-1)}};SQR.Mathx={clamp:function(a,c,b){if(a<c)return c;return a>b?b:a},clamp01:function(a){if(a<0)return 0;return a>1?1:a},step:function(a,c){return c>=a?1:0}};SQR.Matrix2D=function(){typeof Float32Array=="undefined"&&(Float32Array=Array);this.data=new Float32Array(9);var a,c,b,d,e;this.identity=function(){b=this.data;b[0]=1;b[1]=0;b[2]=0;b[3]=0;b[4]=1;b[5]=0;b[6]=0;b[7]=0;b[8]=1;return this};this.transformVector=function(a){b=this.data;d=a.x;e=a.y;a.x=b[0]*d+b[1]*e+b[2];a.y=b[3]*d+b[4]*e+b[5];return a};this.setTranslation=function(a,c,d){b=d||this.data;b[0]=1;b[1]=0;b[2]=a;b[3]=0;b[4]=1;b[5]=c;b[6]=0;b[7]=0;b[8]=1;return this};this.getTranslation=function(a){b=
this.data;a=a||new SQR.V2;a.x=b[2];a.y=b[5];return a};this.setScale=function(a,c,d){b=d||this.data;b[0]=a;b[1]=0;b[2]=0;b[3]=0;b[4]=c;b[5]=0;b[6]=0;b[7]=0;b[8]=1;return this};this.setShear=function(a,c,d){b=d||this.data;b[0]=1;b[1]=a;b[2]=0;b[3]=c;b[4]=1;b[5]=0;b[6]=0;b[7]=0;b[8]=1;return this};this.setRotation=function(a,c){b=c||this.data;var d=Math.cos(a),f=Math.sin(a);b[0]=d;b[1]=-f;b[2]=0;b[3]=f;b[4]=d;b[5]=0;b[6]=0;b[7]=0;b[8]=1;return this};this.setTRS=function(a,c,d,f,e){b=this.data;var h=
Math.cos(d);d=Math.sin(d);b[0]=h*f;b[1]=-d*e;b[2]=a;b[3]=d*f;b[4]=h*e;b[5]=c;b[6]=0;b[7]=0;b[8]=1;return this};this.translate=function(a,c){this.setTranslation(a,c,SQR.Matrix2D.__temp);return this.multiply(SQR.Matrix2D.__temp)};this.rotate=function(a){this.setRotation(a,SQR.Matrix2D.__temp);return this.multiply(SQR.Matrix2D.__temp)};this.scale=function(a,c){this.setScale(a,c,SQR.Matrix2D.__temp);return this.multiply(SQR.Matrix2D.__temp)};this.shear=function(a,c){this.setRotation(a,c,SQR.Matrix2D.__temp);
return this.multiply(SQR.Matrix2D.__temp)};var g,f,h,i,k,m,o,l,j,n,p,q,r,t,v;this.multiply=function(b){a=this.data;c=b.data||b;g=a[0];f=a[1];h=a[2];i=a[3];k=a[4];m=a[5];o=c[0];l=c[1];j=c[2];n=c[3];p=c[4];q=c[5];r=c[6];t=c[7];v=c[8];a[0]=g*o+f*n+h*r;a[1]=g*l+f*p+h*t;a[2]=g*j+f*q+h*v;a[3]=i*o+k*n+m*r;a[4]=i*l+k*p+m*t;a[5]=i*j+k*q+m*v;return this};this.copyTo=function(b){a=this.data;c=b.data||b;c[0]=a[0];c[1]=a[1];c[2]=a[2];c[3]=a[3];c[4]=a[4];c[5]=a[5];c[6]=a[6];c[7]=a[7];c[8]=a[8];return b};this.copyFrom=
function(b){a=b.data||b;c=this.data;c[0]=a[0];c[1]=a[1];c[2]=a[2];c[3]=a[3];c[4]=a[4];c[5]=a[5];c[6]=a[6];c[7]=a[7];c[8]=a[8];return this};var u=function(a){return Math.abs(a)<1.0E-6?0:a};this.getAsCSSProperty=function(a){var c=this.data;return a?"matrix3d("+u(c[0])+","+u(c[3])+",0,0,"+u(c[1])+","+u(c[4])+",0,0,0,0,1,0,"+u(c[2])+","+u(c[5])+",0,1)":"matrix("+u(c[0])+","+u(c[3])+","+u(c[1])+","+u(c[4])+","+u(c[2])+","+u(c[5])+")"};this.identity()};SQR.Matrix33=function(){this.data=new Float32Array(9);this.identity=function(){var a=this.data;a[0]=1;a[3]=0;a[6]=0;a[1]=0;a[4]=1;a[7]=0;a[2]=0;a[5]=0;a[8]=1;return this};this.transformVector=function(a,c){var b=this.data,d=a.x,e=a.y,g=a.z;c=c||a;c.x=b[0]*d+b[3]*e+b[6]*g;c.y=b[1]*d+b[4]*e+b[7]*g;c.z=b[2]*d+b[5]*e+b[8]*g;return c};this.determinant=function(){var a=this.data;return a[0]*(a[4]*a[8]-a[7]*a[5])+a[3]*(a[7]*a[2]-a[1]*a[8])+a[6]*(a[1]*a[5]-a[4]*a[2])};this.inverse=function(a){var c=this.data;
a=a||this.data;var b=c[0],d=c[1],e=c[2],g=c[3],f=c[4],h=c[5],i=c[6],k=c[7],m=c[8],o=m*f-h*k,l=-m*g+h*i,j=k*g-f*i;c=b*o+d*l+e*j;if(!c)return console.warn("Attempt to inverse a singular matrix44. ",this.data),a;c=1/c;a[0]=o*c;a[1]=(-m*d+e*k)*c;a[2]=(h*d-e*f)*c;a[3]=l*c;a[4]=(m*b-e*i)*c;a[5]=(-h*b+e*g)*c;a[6]=j*c;a[7]=(-k*b+d*i)*c;a[8]=(f*b-d*g)*c;return a};this.transpose=function(){var a=this.data,c=a[3],b=a[6],d=a[1],e=a[4],g=a[7],f=a[2],h=a[5],i=a[8];a[0]=a[0];a[1]=c;a[2]=b;a[3]=d;a[4]=e;a[5]=g;a[6]=
f;a[7]=h;a[8]=i}};SQR.Matrix44=function(){this.data=new Float32Array(16);this.identity=function(a){a=a||this.data;a[0]=1;a[4]=0;a[8]=0;a[12]=0;a[1]=0;a[5]=1;a[9]=0;a[13]=0;a[2]=0;a[6]=0;a[10]=1;a[14]=0;a[3]=0;a[7]=0;a[11]=0;a[15]=1};this.transformVector=function(a,b){var d=this.data,e=a.x,g=a.y,f=a.z,h=a.w;b=b||a;b.x=d[0]*e+d[4]*g+d[8]*f+d[12]*h;b.y=d[1]*e+d[5]*g+d[9]*f+d[13]*h;b.z=d[2]*e+d[6]*g+d[10]*f+d[14]*h;return b};this.multiply=function(a){var b=this.data,d=a.data||a,e,g,f,h,i,k,m,o,l,j,n,p,q,r,t,v,u,w,x,y,
z,A,B,C,D,s,E,F,G,H;a=b[0];e=b[1];g=b[2];f=b[3];h=b[4];i=b[5];k=b[6];m=b[7];o=b[8];l=b[9];j=b[10];n=b[11];p=b[12];q=b[13];r=b[14];t=b[15];v=d[0];u=d[1];w=d[2];x=d[3];y=d[4];z=d[5];A=d[6];B=d[7];C=d[8];D=d[9];s=d[10];E=d[11];F=d[12];G=d[13];H=d[14];d=d[15];b[0]=a*v+h*u+o*w+p*x;b[1]=e*v+i*u+l*w+q*x;b[2]=g*v+k*u+j*w+r*x;b[3]=f*v+m*u+n*w+t*x;b[4]=a*y+h*z+o*A+p*B;b[5]=e*y+i*z+l*A+q*B;b[6]=g*y+k*z+j*A+r*B;b[7]=f*y+m*z+n*A+t*B;b[8]=a*C+h*D+o*s+p*E;b[9]=e*C+i*D+l*s+q*E;b[10]=g*C+k*D+j*s+r*E;b[11]=f*C+m*D+
n*s+t*E;b[12]=a*F+h*G+o*H+p*d;b[13]=e*F+i*G+l*H+q*d;b[14]=g*F+k*G+j*H+r*d;b[15]=f*F+m*G+n*H+t*d;return this};this.setTQS=function(a,b,d,e,g,f,h,i,k,m,o){var l=o||this.data;this.identity(o);var j=g*g,n=f*f,p=h*h;l[0]=(1-2*n-2*p)*i;l[1]=(2*g*f-2*h*e)*i;l[2]=(2*g*h+2*f*e)*i;l[4]=(2*g*f+2*h*e)*k;l[5]=(1-2*j-2*p)*k;l[6]=(2*f*h-2*g*e)*k;l[8]=(2*g*h-2*f*e)*m;l[9]=(2*f*h+2*g*e)*m;l[10]=(1-2*j-2*n)*m;l[12]=a;l[13]=b;l[14]=d;return o||this};this.setTRS=function(a,b,d,e,g,f,h,i,k,m){var o=m||this.data;this.identity(m);
var l=Math.sin(e);e=Math.cos(e);var j=Math.sin(g);g=Math.cos(g);var n=Math.sin(f);f=Math.cos(f);o[0]=(g*f+j*l*n)*h;o[1]=(-g*n+j*l*f)*h;o[2]=j*e*h;o[4]=n*e*i;o[5]=f*e*i;o[6]=-l*i;o[8]=(-j*f+g*l*n)*k;o[9]=(n*j+g*l*f)*k;o[10]=g*e*k;o[12]=a;o[13]=b;o[14]=d;return m||this};this.setScale=function(a,b,d,e){var g=e||this.data;this.identity(e);g[0]=a;g[5]=b;g[10]=d;return e||this};this.setTranslation=function(a,b,d,e){var g=e||this.data;this.identity(e);g[12]=a;g[13]=b;g[14]=d;return e||this};this.setRotation=
function(a,b,d,e){var g=e||this.data;this.identity(e);var f=Math.sin(a);a=Math.cos(a);var h=Math.sin(b);b=Math.cos(b);var i=Math.sin(d);d=Math.cos(d);g[0]=b*d+h*f*i;g[1]=-b*i+h*f*d;g[2]=h*a;g[4]=i*a;g[5]=d*a;g[6]=-f;g[8]=-h*d+b*f*i;g[9]=i*h+b*f*d;g[10]=b*a;return e||this};this.translate=function(a,b,d){this.setTranslation(a,b,d,SQR.Matrix44.__temp);return this.multiply(SQR.Matrix44.__temp)};this.rotate=function(a,b,d){this.setRotation(a,b,d,SQR.Matrix44.__temp);return this.multiply(SQR.Matrix44.__temp)};
this.scale=function(a,b,d){this.setScale(a,b,d,SQR.Matrix44.__temp);return this.multiply(SQR.Matrix44.__temp)};this.copyTo=function(a){for(var b=this.data,d=a.data||a,e=0;e<16;e++)d[e]=b[e];return a};this.copyRotationTo=function(a){var b=this.data,d=a.data||a;d[0]=b[0];d[1]=b[1];d[2]=b[2];d[3]=b[4];d[4]=b[5];d[5]=b[6];d[6]=b[8];d[7]=b[9];d[8]=b[10];return a};var a=function(a){return Math.abs(a)<1.0E-6?0:a};this.getAsCSSProperty=function(){var c=this.data;return"matrix3d("+a(c[0])+","+a(c[1])+","+
a(c[2])+","+a(c[3])+","+a(c[4])+","+a(c[5])+","+a(c[6])+","+a(c[7])+","+a(c[8])+","+a(c[9])+","+a(c[10])+","+a(c[11])+","+a(c[12])+","+a(c[13])+","+a(c[14])+","+a(c[15])+")"};this.extractPosition=function(a){var b=this.data;a.set(b[12],b[13],b[14]);return a};this.determinant=function(){var a=this.data;return a[0]*(a[5]*a[10]-a[9]*a[6])+a[4]*(a[9]*a[2]-a[1]*a[10])+a[8]*(a[1]*a[6]-a[5]*a[2])};this.inverse=function(a){var b=this.data,d=a?a.data||a:this.data,e=this.determinant();if(Math.abs(e)<1.0E-4)return console.warn("Attempt to inverse a singular matrix44. ",
this.data),console.trace(),a;var g=b[0],f=b[4],h=b[8],i=b[12],k=b[1],m=b[5],o=b[9],l=b[13],j=b[2],n=b[6],p=b[10];b=b[14];e=1/e;d[0]=(m*p-o*n)*e;d[1]=(h*n-f*p)*e;d[2]=(f*o-h*m)*e;d[4]=(o*j-k*p)*e;d[5]=(g*p-h*j)*e;d[6]=(h*k-g*o)*e;d[8]=(k*n-m*j)*e;d[9]=(f*j-g*n)*e;d[10]=(g*m-f*k)*e;d[12]=-(i*d[0]+l*d[4]+b*d[8]);d[13]=-(i*d[1]+l*d[5]+b*d[9]);d[14]=-(i*d[2]+l*d[6]+b*d[10]);return a};this.transpose=function(a){var b=this.data;a=a?a.data||a:this.data;var d=b[4],e=b[8],g=b[1],f=b[5],h=b[9],i=b[2],k=b[6],
m=b[10];a[0]=b[0];a[1]=d;a[2]=e;a[4]=g;a[5]=f;a[6]=h;a[8]=i;a[9]=k;a[10]=m};this.lookAt=function(a,b){var d=this.data,e=SQR.Matrix44.__tv1,g=SQR.Matrix44.__tv2,f=SQR.Matrix44.__tv3;f.set(d[12],d[13],d[14]);f.sub(f,a).norm();if(f.magsq()===0)f.z=1;e.cross(b,f).norm();e.magsq()===0&&(f.x+=1.0E-4,e.cross(b,f).norm());g.cross(f,e);d[0]=e.x;d[4]=g.x;d[8]=f.x;d[1]=e.y;d[5]=g.y;d[9]=f.y;d[2]=e.z;d[6]=g.z;d[10]=f.z;return this};this.identity()};SQR.Noise={random3_seed:1};SQR.Noise.isPrime=function(a){for(var c=2;c<=a-1;c++)if(a%c==0)return!1;return!0};SQR.Noise.random1=function(a){a^=a<<13;return 1-(a*(a*a*15731+789221)+1376312589&2147483647)/1073741824};SQR.Noise.random2=function(a){a^=a<<13;return(a*16807+16807)%255};SQR.Noise.random3=function(){SQR.Noise.random3_seed=SQR.Noise.random3_seed*16807%2147483647;return SQR.Noise.random3_seed/2147483647};var ImprovedNoise=function(){function a(a){return a*a*a*(a*(a*6-15)+10)}function c(a,b,c){return b+a*(c-b)}function b(a,b,c,d){a&=15;var e=a<8?b:c;b=a<4?c:a==12||a==14?b:d;return((a&1)==0?e:-e)+((a&2)==0?b:-b)}for(var d=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,
211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,
181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180],e=0;e<256;e++)d[256+e]=d[e];return{noise:function(e,f,h){var i=~~e,k=~~f,m=~~h,o=i&255,l=k&255,j=m&255;e-=i;f-=k;h-=m;i=e-1;k=f-1;m=h-1;var n=a(e),p=a(f),q=a(h),r=d[o]+l,t=d[r]+j;r=d[r+1]+j;l=d[o+1]+l;o=d[l]+j;j=d[l+1]+j;return c(q,c(p,c(n,b(d[t],e,f,h),b(d[o],i,f,h)),c(n,b(d[r],e,k,h),b(d[j],i,k,h))),c(p,c(n,b(d[t+1],e,f,m),b(d[o+1],i,f,h-1)),c(n,b(d[r+1],e,k,m),b(d[j+
1],i,k,m))))}}};SQR.ProjectionMatrix=function(){typeof Float32Array=="undefined"&&(Float32Array=Array);this.data=new Float32Array(16);this.copyTo=function(a){for(var c=this.data,b=a.data||a,d=0;d<16;d++)b[d]=c[d];return a};this.identity()};SQR.ProjectionMatrix.prototype.identity=function(){var a=this.data;a[0]=1;a[1]=0;a[2]=0;a[3]=0;a[4]=0;a[5]=1;a[6]=0;a[7]=0;a[8]=0;a[9]=0;a[10]=1;a[11]=0;a[12]=0;a[13]=0;a[14]=0;a[15]=1};
SQR.ProjectionMatrix.prototype.perspective=function(a,c,b,d){var e=this.data;a=b*Math.tan(a*Math.PI/360);var g=d-b;e[0]=b/(a*c);e[4]=0;e[8]=0;e[12]=0;e[1]=0;e[5]=b/a;e[9]=0;e[13]=0;e[2]=0;e[6]=0;e[10]=-(d+b)/g;e[14]=-(2*d*b)/g;e[3]=0;e[7]=0;e[11]=-1;e[15]=0};SQR.ProjectionMatrix.prototype.transformVector=function(a,c){var b=a.x,d=a.y,e=a.z,g=a.w,f=this.data;c=c||a;c.x=f[0]*b+f[4]*d+f[8]*e+f[12]*g;c.y=f[1]*b+f[5]*d+f[9]*e+f[13]*g;c.z=f[2]*b+f[6]*d+f[10]*e+f[14]*g;return c};
SQR.ProjectionMatrix.prototype.inverse=function(a){var c=this.data;a=a||this.data;var b=c[0],d=c[1],e=c[2],g=c[3],f=c[4],h=c[5],i=c[6],k=c[7],m=c[8],o=c[9],l=c[10],j=c[11],n=c[12],p=c[13],q=c[14];c=c[15];var r=b*h-d*f,t=b*i-e*f,v=b*k-g*f,u=d*i-e*h,w=d*k-g*h,x=e*k-g*i,y=m*p-o*n,z=m*q-l*n,A=m*c-j*n,B=o*q-l*p,C=o*c-j*p,D=l*c-j*q,s=r*D-t*C+v*B+u*A-w*z+x*y;if(!s)return null;s=1/s;a[0]=(h*D-i*C+k*B)*s;a[1]=(-d*D+e*C-g*B)*s;a[2]=(p*x-q*w+c*u)*s;a[3]=(-o*x+l*w-j*u)*s;a[4]=(-f*D+i*A-k*z)*s;a[5]=(b*D-e*A+g*
z)*s;a[6]=(-n*x+q*v-c*t)*s;a[7]=(m*x-l*v+j*t)*s;a[8]=(f*C-h*A+k*y)*s;a[9]=(-b*C+d*A-g*y)*s;a[10]=(n*w-p*v+c*r)*s;a[11]=(-m*w+o*v-j*r)*s;a[12]=(-f*B+h*z-i*y)*s;a[13]=(b*B-d*z+e*y)*s;a[14]=(-n*u+p*t-q*r)*s;a[15]=(m*u-o*t+l*r)*s;return a};SQR.QuadraticBezier=function(a,c,b,d){if(!a||!c&&!b||!d)throw"Failed to create cruve: 4 2D|3D vectors are required.";this.p0=a;this.c0=c;this.c1=b;this.p1=d;var e=a.clone().set(),g=SQR.Interpolation.bezierPosition,f=SQR.Interpolation.bezierVelocity;this.velocityAt=function(a,b){b=b||e;b.x=f(a,this.p0.x,this.c0.x,this.c1.x,this.p1.x);b.y=f(a,this.p0.y,this.c0.y,this.c1.y,this.p1.y);if(b.z&&this.p0.z)b.z=f(a,this.p0.z,this.c0.z,this.c1.z,this.p1.z);return b};this.valueAt=function(a,b){b=b||e;b.x=g(a,
this.p0.x,this.c0.x,this.c1.x,this.p1.x);b.y=g(a,this.p0.y,this.c0.y,this.c1.y,this.p1.y);if(b.z!=null&&this.p0.z!=null)b.z=g(a,this.p0.z,this.c0.z,this.c1.z,this.p1.z);return b};this.createSegment=function(a,b){var c=b||new SQR.Geometry;c.continous=!0;c.vertices=c.vertices||[];c.tangents=c.tangents||[];for(var d=0;d<=a;d++){var e=d/a;c.vertices.push(this.valueAt(e,new SQR.V3));c.tangents.push(this.velocityAt(e,new SQR.V3))}return c};this.createRibbon=function(a,b,c,d){d=d||new SQR.Geometry;for(var e=
0;e<a;e++){var f=e/a,g=(e+1)/a,n=this.valueAt(f,new SQR.V3),p=this.valueAt(g,new SQR.V3);f=this.velocityAt(f,new SQR.V3).norm();var q=this.velocityAt(g,new SQR.V3).norm(),r=new SQR.V3;r.cross(f,q).norm();g=new SQR.V3;g.cross(f,r);f=new SQR.V3;f.cross(q,r);g.mul(b*0.5);f.mul(b*0.5);q=new SQR.V3;r=new SQR.V3;var t=new SQR.V3,v=new SQR.V3;q.add(n,g);r.add(n,g.neg());t.add(p,f);v.add(p,f.neg());d.color=c;d.addTriangle(q,t,r,c);d.addTriangle(t,r,v,c);d.addTriangle(q,r,t,c);d.addTriangle(t,v,r,c)}return d}};SQR.Quaternion=function(a,c,b,d){this.set(a,c,b,d)};SQR.Quaternion.prototype.set=function(a,c,b,d){this.w=a||1;this.x=c||0;this.y=b||0;this.z=d||0};SQR.Quaternion.prototype.copyFrom=function(a){this.w=a.w;this.x=a.x;this.y=a.y;this.z=a.z};SQR.Quaternion.prototype.identity=function(){this.set()};SQR.Quaternion.prototype.mul=function(a,c){c=c||this;c.set(c.w*a.w-c.x*a.x-c.y*a.y-c.z*a.z,c.w*a.x+c.x*a.w+c.y*a.z-c.z*a.y,c.w*a.y-c.x*a.z+c.y*a.w+c.z*a.x,c.w*a.z+c.x*a.y-c.y*a.x+c.z*a.w);c.normalize();return c};
SQR.Quaternion.prototype.lookAt=function(a,c){var b=SQR.Quaternion.__tv1,d=SQR.Quaternion.__tv2,e=SQR.Quaternion.__tv3;a.copyTo(b);c.copyTo(e);b.norm();if(b.z==-1)b.x=1.0E-4,b.norm();d.cross(e,b);e.cross(b,d);this.w=Math.sqrt(1+d.x+e.y+b.z)*0.5;var g=4*this.w;this.x=(b.y-e.z)/g;this.y=(d.z-b.x)/g;this.z=(e.x-d.y)/g;this.normalize();return this};SQR.Quaternion.prototype.fromAngleAxis=function(a,c,b,d){var e=Math.sin(a/2);this.x=c*e;this.y=b*e;this.z=d*e;this.w=Math.cos(a/2)};
SQR.Quaternion.prototype.mag=function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)};SQR.Quaternion.prototype.normalize=function(){var a=this.mag();this.x/=a;this.y/=a;this.z/=a;this.w/=a};SQR.Quaternion.prototype.toMatrix=function(){};
SQR.Quaternion.slerp=function(a,c,b,d){d=d||new SQR.Quaternion;var e=a.w*c.w+a.x*c.x+a.y*c.y+a.z*c.z,g=Math.acos(e),f=Math.sqrt(1-e*e),h=Math.sin((1-b)*g)/f;b=Math.sin(b*g)/f;Math.abs(e)>=1?(h=1,b=0):Math.abs(f)<0.0010&&(b=h=0.5);d.w=a.w*h+c.w*b;d.x=a.x*h+c.x*b;d.y=a.y*h+c.y*b;d.z=a.z*h+c.z*b;return d};SQR.Spline=function(a,c,b,d){var e=this;this.rawPoints=[];this.controlPoints=[];var g=1,f=4,h=!1;this.rawPoints.push(a,c,b,d);this.controlPoints.push(a,c,b,d);var i=new SQR.V2,k=function(a,b){return(new SQR.V2).sub(b,a).mul(0.5).appendVec(a)},m=function(a,b,c){var d,f=e.controlPoints;d=Math.floor(a*g);a=a*g-d;d==f.length/4&&(d=Math.max(0,d-1),a=1);d*=4;b=b||i;b.x=c(a,f[d+0].x,f[d+1].x,f[d+2].x,f[d+3].x);b.y=c(a,f[d+0].y,f[d+1].y,f[d+2].y,f[d+3].y);return b};this.valueAt=function(a,b){return m(a,b,
SQR.Interpolation.bezierPosition)};this.velocityAt=function(a,b){return m(a,b,SQR.Interpolation.bezierVelocity)};this.add=function(a,b){this.rawPoints.push(a,b);f=this.rawPoints.length;this.calculateControlPoints()};this.closePath=function(){h=!0;this.calculateControlPoints()};this.calculateControlPoints=function(){if(f<4||f%2==1)throw"Spline is corrupt - illegal number of points (should be an even number and >= 4)";this.controlPoints=[];g=1;for(var a=0;a<f;a++){var b=this.rawPoints[a];if(a<3)if(h&&
a==0){var c=this.rawPoints[a+1];c=k(c,b);this.controlPoints.push(c)}else this.controlPoints.push(b);else a>=3&&a%2==0?this.controlPoints.push(b):a>=3&&a%2==1&&a==f-1&&!h?this.controlPoints.push(b):a>=3&&a%2==1&&a<f-1&&(c=this.rawPoints[a-1],c=k(b,c),this.controlPoints.push(c,c,b),g++)}if(h){a=this.rawPoints[this.rawPoints.length-1];b=this.rawPoints[0];var d=this.rawPoints[1];c=k(a,this.rawPoints[this.rawPoints.length-2]);d=k(b,d);this.controlPoints.push(c,c,a,b,d);g++}}};SQR.Spring=function(a){this.anchor=a||new SQR.V2;this.location=this.anchor.clone();this.acceleration=this.anchor.clone();this.velocity=this.anchor.clone();this.friction=0.85;this.k=0.1;var c=0;this.update=function(){this.acceleration.sub(this.location,this.anchor);c=this.acceleration.mag();this.acceleration.norm().mul(-this.k*c);this.velocity.add(this.velocity,this.acceleration);this.velocity.mul(this.friction);this.location.add(this.location,this.velocity)}};SQR.V2=function(a,c){this.x=a||0;this.y=c||0};SQR.V2.prototype.set=function(a,c){this.x=a||0;this.y=c||0;return this};SQR.V2.prototype.copyTo=function(a){a.x=this.x;a.y=this.y};SQR.V2.prototype.copyFrom=function(a){this.x=a.x;this.y=a.y;return this};SQR.V2.prototype.add=function(a,c){this.x=a.x+c.x;this.y=a.y+c.y;return this};SQR.V2.prototype.sub=function(a,c){this.x=a.x-c.x;this.y=a.y-c.y;return this};SQR.V2.prototype.neg=function(){this.x*=-1;this.y*=-1;return this};
SQR.V2.prototype.appendVec=function(a){if(!a)return this;this.x+=a.x;this.y+=a.y;return this};SQR.V2.prototype.mul=function(a,c){c=c||this;c.x=this.x*a;c.y=this.y*a;return c};SQR.V2.prototype.magsq=function(){return this.x*this.x+this.y*this.y};SQR.V2.prototype.mag=function(){return Math.sqrt(this.magsq())};SQR.V2.prototype.norm=function(){var a=this.mag();if(a==0)return this;this.x/=a;this.y/=a;return this};SQR.V2.prototype.perpendicular=function(){var a=this.x;this.x=-this.y;this.y=a;return this};
SQR.V2.prototype.isZero=function(){return this.x==0&&this.y==0};SQR.V2.random=function(){return new SQR.V2(Math.random()*2-1,Math.random()*2-1)};SQR.V2.prototype.setAngleRadius=function(a,c){this.x=Math.cos(a)*c;this.y=Math.sin(a)*c;return this};SQR.V2.prototype.append=function(a,c){this.x+=a;this.y+=c;return this};SQR.V2.prototype.addAngleRadius=function(a,c){this.x+=Math.cos(a)*c;this.y+=Math.sin(a)*c;return this};SQR.V2.prototype.clone=function(){return new SQR.V2(this.x,this.y)};
SQR.V2.dot=function(a,c){return a.x*c.x+a.y*c.y};SQR.V3=function(a,c,b,d){this.x=a||0;this.y=c||0;this.z=b||0;this.w=d||1};SQR.V3.prototype.set=function(a,c,b,d){this.x=a||0;this.y=c||0;this.z=b||0;this.w=d||1;return this};SQR.V3.prototype.append=function(a,c,b,d){this.x+=a||0;this.y+=c||0;this.z+=b||0;this.w+=d||0;return this};SQR.V3.prototype.appendVec=function(a){if(!a)return this;this.x+=a.x;this.y+=a.y;this.z+=a.z;this.w+=a.w;return this};SQR.V3.prototype.copyTo=function(a){a.x=this.x;a.y=this.y;a.z=this.z;a.w=this.w;return a};
SQR.V3.prototype.copy=function(a){a=a||new SQR.V3;a.set(this.x,this.y,this.z,this.w);return a};SQR.V3.prototype.copyFrom=function(a){this.x=a.x;this.y=a.y;this.z=a.z;this.w=a.w;return this};SQR.V3.prototype.magsq=function(){return this.x*this.x+this.y*this.y+this.z*this.z};SQR.V3.prototype.mag=function(){return Math.sqrt(this.magsq())};SQR.V3.prototype.isZero=function(){return this.x==0&&this.y==0&&this.z==0};SQR.V3.prototype.mul=function(a){this.x*=a;this.y*=a;this.z*=a;return this};
SQR.V3.prototype.neg=function(){this.x=-this.x;this.y=-this.y;this.z=-this.z;return this};SQR.V3.prototype.norm=function(){var a=1/this.mag();this.set(this.x*a,this.y*a,this.z*a);return this};SQR.V3.prototype.add=function(a,c){this.x=a.x+c.x;this.y=a.y+c.y;this.z=a.z+c.z;return this};SQR.V3.prototype.sub=function(a,c){this.x=a.x-c.x;this.y=a.y-c.y;this.z=a.z-c.z;return this};SQR.V3.dot=function(a,c){return a.x*c.x+a.y*c.y+a.z*c.z};
SQR.V3.prototype.clone=function(){return new SQR.V3(this.x,this.y,this.z)};SQR.V3.prototype.cross=function(a,c){this.set(a.y*c.z-a.z*c.y,a.z*c.x-a.x*c.z,a.x*c.y-a.y*c.x,this.w);return this};SQR.V3.up=new SQR.V3(0,1,0);SQR.V3.forward=new SQR.V3(0,0,-1);SQR.VectorUtil={mouseToUnitSphereVector:function(a,c,b,d){b=b||0.5;d=d||new SQR.V3;a/=b;c/=b;b=a*a+c*c;b>=1?d.set(a,c,0):d.set(a,c,Math.sqrt(1-b));d.norm();return d}};SQR.Quaternion.__tv1=new SQR.V3;SQR.Quaternion.__tv2=new SQR.V3;SQR.Quaternion.__tv3=new SQR.V3;SQR.Matrix2D.__temp=new Float32Array(9);SQR.Matrix33.__temp=new Float32Array(9);SQR.Matrix44.__temp=new Float32Array(16);SQR.Matrix44.__tv1=new SQR.V3;SQR.Matrix44.__tv2=new SQR.V3;SQR.Matrix44.__tv3=new SQR.V3;SQR.VectorUtil.__tv1=new SQR.V3;
SQR.VectorUtil.__tv2=new SQR.V3;SQR.VectorUtil.__tv3=new SQR.V3;SQR.Squareroot=function(a,c){this.setBackground=function(b){if(a)a.style.backgroundColor=b};this.setClearColor=function(a){g=a};this.setProjection=function(a){e.cssDistance=0.5/Math.tan(a*Math.PI/360)*e.height;e.projection.perspective(a,e.width/e.height,0.1,1E3);if(c)c.style.perspective=e.cssDistance+"px",c.style["-webkit-perspective"]=e.cssDistance+"px",c.style["-moz-perspective"]=e.cssDistance+"px",c.style["-o-perspective"]=e.cssDistance+"px"};this.setPerspectiveOrigin=function(a,b){c&&(c.style["perspective-origin"]=
a+"px "+b+"px",c.style["-webkit-perspective-origin"]=a+"px "+b+"px",c.style["-moz-perspective-origin"]=a+"px "+b+"px",c.style["-o-perspective-origin"]=a+"px "+b+"px")};this.cssDistance=function(){return e.cssDistance};this.setSize=function(b,c){e.width=b;e.height=c;if(a)a.width=b,a.height=c;e.aspect=b/c;e.centerX=b*0.5;e.centerY=c*0.5};this.children=[];this.numChildren=0;var b=[];this.add=function(){for(var a=0;a<arguments.length;a++){var b=arguments[a];b.parent=null;this.children.indexOf(b)==-1&&
this.children.push(b)}this.numChildren=this.children.length};this.remove=function(){for(var a=0;a<arguments.length;a++){var b=arguments[a],c=this.children.indexOf(b);if(c==-1)return!1;b.parent=null;b.renderer&&(b.renderer.isDom2d||b.renderer.isDom3d)&&b.renderer.removeFromDom();this.children.splice(c,1)}this.numChildren=this.children.length};this.contains=function(a){return this.children.indexOf(a)>-1};this.recurse=function(a){for(var b=0;b<this.numChildren;b++)this.children[b].recurse(a)};this.removeAll=
function(){for(var a=0;a<this.numChildren;a++){var b=this.children[a];b.parent=null;b.renderer&&(b.renderer.isDom2d||b.renderer.isDom3d)&&b.renderer.removeFromDom()}this.children=[];this.numChildren=this.children.length};var d=function(a){a.renderer&&(a.renderer.isDom3d&&SQR.usePreserve3d&&a.parent&&a.parent.renderer&&a.parent.renderer.isDom3d?a.renderer.appendToDom(a.parent.renderer.element):(a.renderer.isDom2d||a.renderer.isDom3d)&&a.renderer.appendToDom(c));a.transformWorld();b.push(a);if(a.numChildren>
0)for(var e=0;e<a.numChildren;e++)d(a.children[e])};this.render=function(c){SQR.Time.tick();b.length=0;if(e.context)e.context.setTransform(1,0,0,1,0,0),g!=null?(e.context.fillStyle=g,e.context.fillRect(0,0,a.width,a.height)):e.context.clearRect(0,0,a.width,a.height);for(var h=0;h<this.numChildren;h++)d(this.children[h]);var i=b.length;e.camera=c;e.viewMatrix=c.computeInverseMatrix();e.lightDirection=this.lightDirection;for(h=0;h<i;h++)c=b[h],c.transformView(e.viewMatrix);b.sort(function(a,b){var c=
a.depth(),d=b.depth();if(c<d)return-1;if(c>d)return 1;return 0});for(h=0;h<i;h++)if(c=b[h],c.enabled){if(c.renderer)e.depth=h,c.renderer.draw(c,e);c.collider&&c.collider.project(c,e)}};var e={};if(a)e.context=a.getContext("2d"),this.setSize(a.width,a.height);e.projection=new SQR.ProjectionMatrix;e.container=c;this.lightDirection=(new SQR.V3(0,1,0)).norm();var g=null};SQR.Transform=function(a){this.name=a;this.enabled=!0;this.useQuaternion=this.directMatrixMode=!1;this.engine=this.parent=this.collider=this.geometry=this.renderer=null;this.position=new SQR.V3;this.rotation=new SQR.V3;this.rotationQ=new SQR.Quaternion;this.scale=new SQR.V3(1,1,1);var c=new SQR.V3;this.matrix=new SQR.Matrix44;this.globalMatrix=new SQR.Matrix44;this.viewMatrix=new SQR.Matrix44;this.inverseWorldMatrix=new SQR.Matrix44;this.positioningMode=0;this.depth=function(){return this.viewMatrix.data[14]};
this.children=[];this.numChildren=0;this.add=function(){for(var a=0;a<arguments.length;a++){var c=arguments[a];c.parent=this;this.children.indexOf(c)==-1&&this.children.push(c)}this.numChildren=this.children.length};this.remove=function(){for(var a=0;a<arguments.length;a++){var c=arguments[a],e=this.children.indexOf(c);if(e==-1)return!1;c.parent=null;c.renderer&&(c.renderer.isDom2d||c.renderer.isDom3d)&&c.renderer.removeFromDom();this.children.splice(e,1)}this.numChildren=this.children.length};this.contains=
function(a){return this.children.indexOf(a)>-1};this.recurse=function(a){a(this);for(var c=0;c<this.numChildren;c++)this.children[c].recurse(a)};this.removeAll=function(){for(var a=0;a<this.numChildren;a++){var c=this.children[a];c.parent=null;c.renderer&&(c.renderer.isDom2d||c.renderer.isDom3d)&&c.renderer.removeFromDom()}this.children=[];this.numChildren=this.children.length};this.transformWorld=function(){if(this.positioningMode!=2){if(!this.directMatrixMode){var a=this.position,c=this.rotationQ,
e=this.rotation,g=this.scale;this.useQuaternion?this.matrix.setTQS(a.x,a.y,a.z,c.w,c.x,c.y,c.z,g.x,g.y,g.z):this.matrix.setTRS(a.x,a.y,a.z,e.x,e.y,e.z,g.x,g.y,g.z)}this.lookDirection&&this.matrix.lookAt(this.lookDirection,SQR.V3.up);this.parent?(this.parent.globalMatrix.copyTo(this.globalMatrix),this.globalMatrix.multiply(this.matrix)):this.matrix.copyTo(this.globalMatrix);this.lookTarget&&this.globalMatrix.lookAt(this.lookTarget.globalPosition(),SQR.V3.up);if(this.positioningMode==1)this.positioningMode=
2}};this.globalPosition=function(){this.globalMatrix.extractPosition(c);return c};this.transformView=function(a){a.copyTo(this.viewMatrix);this.viewMatrix.multiply(this.globalMatrix)};this.lookAt=function(a){this.lookTarget=a};this.lookInDirection=function(a){this.lookDirection=a};this.computeInverseMatrix=function(){this.globalMatrix.inverse(this.inverseWorldMatrix);return this.inverseWorldMatrix}};SQR.Geometry=function(){this.tangents=this.normals=this.particleTextures=this.colors=this.polygons=this.vertices=null;this.closed=this.continous=!1;this.color=null};SQR.Geometry.prototype.addTriangle=function(a,c,b,d){if(!this.polygons)this.polygons=[];this.polygons.push(new SQR.Triangle(a,c,b,d))};SQR.Geometry.prototype.addQuad=function(a,c,b,d,e){if(!this.polygons)this.polygons=[];this.polygons.push(new SQR.Quad(a,c,b,d,e))};
SQR.Geometry.prototype.addSegment=function(a,c,b){if(!this.vertices)this.vertices=[];this.vertices.push(a,c);if(b){if(!this.colors)this.colors=[];this.colors.push(b)}};SQR.Plane=function(a,c,b,d,e,g,f){this.polygons=[];b=b||1;d=d||1;a*=0.5;c*=0.5;e=-a+(e||0);g=-c+(g||0);var h=a*2/b,i=c*2/d,k,m;for(k=0;k<b;k++)for(m=0;m<d;m++){var o=e+k*h,l=o+h,j=g+m*i,n=j+i,p;f?(p=new SQR.V3(o,0,j),j=new SQR.V3(l,0,j),l=new SQR.V3(l,0,n),o=new SQR.V3(o,0,n)):(p=new SQR.V3(o,j,0),j=new SQR.V3(l,j,0),l=new SQR.V3(l,n,0),o=new SQR.V3(o,n,0));n=new SQR.Color(0,100,70);this.polygons.push(new SQR.Triangle(p,j,l,n));this.polygons.push(new SQR.Triangle(p,l,o,n))}this.applyHeightMap=function(b,
d,e,f){for(var g=this.polygons.length,h=function(g){var h=(g.z/c+1)/2,i=(g.x/a+1)/2;h=(e+h*f)%1;h=SQR.CanvasUtil.getPixelNormRed(b,i,h)/255*d;g.y=d-h},i=0;i<g;i++){var j=this.polygons[i];h(j.a);h(j.b);h(j.c)}}};SQR.Quad=function(a,c,b,d,e){var g=this;this.a=a;this.b=c;this.c=b;this.d=d;this.color=e;this.sa=new SQR.V3;this.sb=new SQR.V3;this.sc=new SQR.V3;this.sd=new SQR.V3;this.normal=new SQR.V3;this.center=new SQR.V3;this.depth=0;this.update=function(a,b,c){this.a.copyTo(this.sa);this.b.copyTo(this.sb);this.c.copyTo(this.sc);this.d.copyTo(this.sd);a.transformVector(this.sa);a.transformVector(this.sb);a.transformVector(this.sc);a.transformVector(this.sd);this.center.set(0,0,0).add(this.sa,this.sb).add(this.center,
this.sc).mul(1/3);this.depth=this.center.z;this.sa.x=this.sa.x/this.sa.z*b+b;this.sa.y=this.sa.y/this.sa.z*c+c;this.sb.x=this.sb.x/this.sb.z*b+b;this.sb.y=this.sb.y/this.sb.z*c+c;this.sc.x=this.sc.x/this.sc.z*b+b;this.sc.y=this.sc.y/this.sc.z*c+c;this.sd.x=this.sd.x/this.sd.z*b+b;this.sd.y=this.sd.y/this.sd.z*c+c;a=SQR.VectorUtil.__tv1;b=SQR.VectorUtil.__tv2;c=SQR.VectorUtil.__tv3;a.sub(g.sa,g.sb);b.sub(g.sc,g.sb);c.sub(g.sc,g.sd);a.cross(a,b);c.cross(b,c);g.normal.add(a,c).norm()}};SQR.Triangle=function(a,c,b,d){var e=this;this.a=a;this.b=c;this.c=b;this.color=d;this.sa=new SQR.V3;this.sb=new SQR.V3;this.sc=new SQR.V3;this.normal=new SQR.V3;this.center=new SQR.V3;this.depth=0;this.update=function(a,b,c){this.a.copyTo(this.sa);this.b.copyTo(this.sb);this.c.copyTo(this.sc);a.transformVector(this.sa);a.transformVector(this.sb);a.transformVector(this.sc);this.center.set(0,0,0).add(this.sa,this.sb).add(this.center,this.sc).mul(1/3);this.depth=this.center.z;this.sa.x=this.sa.x/this.sa.z*
b+b;this.sa.y=this.sa.y/this.sa.z*c+c;this.sb.x=this.sb.x/this.sb.z*b+b;this.sb.y=this.sb.y/this.sb.z*c+c;this.sc.x=this.sc.x/this.sc.z*b+b;this.sc.y=this.sc.y/this.sc.z*c+c;a=SQR.VectorUtil.__tv1;b=SQR.VectorUtil.__tv2;a.sub(e.sa,e.sb);b.sub(e.sa,e.sc);e.normal.cross(a,b).norm()}};SQR.CSSCollider=function(a,c){function b(a,b,c,d){n.transformVector(a,b);b.x=b.x/b.z*c+c;b.y=b.y/b.z*d+d}var d=a*0.5,e=c*0.5,g=new SQR.V3(-d,e,0),f=new SQR.V3(d,e,0),h=new SQR.V3(d,-e,0),i=new SQR.V3(-d,-e,0),k=new SQR.V3,m=new SQR.V3,o=new SQR.V3,l=new SQR.V3,j=new SQR.V2,n=new SQR.Matrix44;this.project=function(a,c){c.projection.copyTo(n);n.multiply(a.viewMatrix);b(g,k,c.centerX,c.centerY);b(f,m,c.centerX,c.centerY);b(h,o,c.centerX,c.centerY);b(i,l,c.centerX,c.centerY)};this.intersects=function(a,
b){j.set(a,b);var c=q(j,k,m,o),d=q(j,k,o,l);return c||d};var p=function(a,b,c){return(a.x-c.x)*(b.y-c.y)-(b.x-c.x)*(a.y-c.y)},q=function(a,b,c,d){var e=p(a,b,c)<0;c=p(a,c,d)<0;a=p(a,d,b)<0;return e==c&&c==a}};SQR.Particle=function(a){this.position=a=a||new SQR.V2;this.velocity=a.clone().set();this.acceleration=a.clone().set();this.angularAcceleration=this.angularVelocity=0;this.mass=1;this.friction=2;this.bounciness=1;var c=a.clone().set(),b=a.clone().set();this.addForce=function(a){c.copyFrom(a);c.mul(1/this.mass);this.acceleration.appendVec(c)};this.update=function(a){b.copyFrom(this.velocity);b.norm();b.mul(-this.friction);this.addForce(b);this.acceleration.mul(a||1);this.velocity.appendVec(this.acceleration);
this.position.appendVec(this.velocity);this.acceleration.set()}};SQR.DOMElement2D=function(a){this.isDom2d=!0;this.element=a;var c=!1,b=null,d=new SQR.Matrix2D,e=new SQR.Matrix44;this.appendToDom=function(a){c&&a==b||(b=a,b.appendChild(this.element),c=!0)};this.removeFromDom=function(){c&&(b.removeChild(this.element),c=!1)};this.setBackfaceVisibility=function(){};this.draw=function(b,c){c.projection.copyTo(e);e.multiply(b.viewMatrix);var h=new SQR.V3(0,0,0);e.transformVector(h);h.x=h.x/h.z*c.centerX;h.y=h.y/h.z*c.centerY;var i=1/(h.z/c.cssDistance);d.setTRS(h.x,
h.y,b.rotation.z,i,i);i=(SQR.supportsCss3d?SQR.DOMUtil.translate3dCss(0,0,0):"")+d.getAsCSSProperty(!1);a.style.zIndex=c.depth;a.style.transform=i;a.style["-webkit-transform"]=i;a.style["-moz-transform"]=i;a.style["-o-transform"]=i;a.style["-ms-transform"]=i;a.style.display=h.z<=0?"none":"block"}};SQR.DOMElement3D=function(a){this.isDom3d=!0;this.element=a;var c=!1,b=null;this.setBackfaceVisibility=function(b){b=b?"visible":"hidden";a.style["backface-visibility"]=b;a.style["-webkit-backface-visibility"]=b;a.style["-moz-backface-visibility"]=b;a.style["-ms-backface-visibility"]=b;a.style["-o-backface-visibility"]=b};this.appendToDom=function(a){c&&a==b||(b=a,b.appendChild(this.element),c=!0)};this.removeFromDom=function(){c&&(b.removeChild(this.element),c=!1)};this.draw=function(b,c){var g=
SQR.DOMUtil.translate3dCss(0,0,c.cssDistance),f="perspective("+c.cssDistance+"px)";g=g+" "+b.viewMatrix.getAsCSSProperty();a.style.transform=g;a.style["-webkit-transform"]=g;a.style["-moz-transform"]=g;a.style["-ms-transform"]=f+g;a.style["-o-transform"]=f+g;a.style.zIndex=c.depth}};SQR.Point=function(a){var c=new SQR.V3,b=new SQR.Matrix44;this.draw=function(d,e){var g=e.context,f=d.geometry;e.projection.copyTo(b);b.multiply(d.viewMatrix);for(var h=0;h<f.vertices.length;h++)if(f.vertices[h].copyTo(c),b.transformVector(c),!(c.z<0))c.x=c.x/c.z*e.centerX+e.centerX-a,c.y=c.y/c.z*e.centerY+e.centerY-a,g.drawImage(f.particleTextures[h],c.x,c.y)}};SQR.Polygon=function(){var a=new SQR.Matrix44;new SQR.V3;this.useLight=this.culling=!1;this.draw=function(c,b){var d=b.context,e=c.geometry;b.projection.copyTo(a);a.multiply(c.viewMatrix);var g,f,h=e.polygons.length;for(g=0;g<h;g++)f=e.polygons[g],f.update(a,b.centerX,b.centerY);e.polygons.sort(function(a,b){var c=a.depth,d=b.depth;if(c<d)return 1;if(c>d)return-1;return 0});for(g=0;g<h;g++)if(f=e.polygons[g],!(Math.max(0,SQR.V3.dot(f.normal,SQR.V3.forward))>0&&this.culling)){var i=Math.max(0,SQR.V3.dot(f.normal,
b.lightDirection)),k=f.color||e.color;d.fillStyle=this.useLight?k.applyLight(i):k.toHSLString();d.strokeStyle=this.useLight?k.applyLight(i):k.toHSLString();d.beginPath();d.moveTo(f.sa.x,f.sa.y);d.lineTo(f.sb.x,f.sb.y);d.lineTo(f.sc.x,f.sc.y);f.sd&&d.lineTo(f.sd.x,f.sd.y);d.closePath();d.fill();d.stroke()}}};SQR.Segment=function(a){var c=this;this.culling=!1;var b=new SQR.V3,d=new SQR.V3,e=new SQR.Matrix44,g=new SQR.V3(0,0,1),f=new SQR.V3;this.draw=function(h,i){var k=i.context,m=h.geometry;i.projection.copyTo(e);e.multiply(h.viewMatrix);var o=m.vertices.length;m.continous&&k.beginPath();for(var l=0;l<o;l++)if(!(!m.continous&&l%2==1||m.continous&&!m.closed&&l==o-1)){var j=l==o-1?0:l+1;m.vertices[l].copyTo(b);m.vertices[j].copyTo(d);k.strokeStyle=(m.colors?m.colors[l/2|0]:m.color).toHSLString();k.lineWidth=
a;j=b;var n=d,p=i.centerX,q=i.centerY;e.transformVector(j);e.transformVector(n);j.z<0||n.z<0?j=!1:(f.sub(j,n).norm(),SQR.V3.dot(f,g)<0&&c.culling?j=!1:(j.x=j.x/j.z*p+p,j.y=j.y/j.z*q+q,n.x=n.x/n.z*p+p,n.y=n.y/n.z*q+q,j=!0));j&&(j=k,n=b,p=d,m.continous?l==0?j.moveTo(n.x,n.y):j.lineTo(n.x,n.y):(j.beginPath(),j.moveTo(n.x,n.y),j.lineTo(p.x,p.y),j.stroke()))}m.continous&&(m.closed&&k.closePath(),k.stroke())}};SQR.CanvasUtil={getPixel:function(a,c,b){c=(b*a.width+c)*4;return[a.data[c+0],a.data[c+1],a.data[c+2],a.data[c+3]]},getPixelRed:function(a,c,b){return a.data[(b*a.width+c)*4]},getPixelNormRed:function(a,c,b){return a.data[((b*(a.height-1)|0)*a.width+(c*(a.width-1)|0))*4]}};SQR.DOMUtil={translate3dCss:function(a,c,b){return" translate3d("+a+"px,"+c+"px,"+b+"px)"}};SQR.Interactor=function(){var a=this;this.centerY=this.centerX=this.normY=this.normX=this.absPageY=this.absPageX=this.pageY=this.pageX=0;var c=function(b){a.pageX=b.pageX;a.pageY=b.pageY;a.pageCenterX=b.pageX-window.innerWidth*0.5;a.pageCenterY=b.pageY-window.innerHeight*0.5;a.absPageX=b.pageX-window.scrollX;a.absPageY=b.pageY-window.scrollY;a.normX=b.pageX/window.innerWidth;a.normY=b.pageY/window.innerHeight;a.centerX=a.normX*2-1;a.centerY=a.normY*2-1};this.destroy=function(){document.removeEventListener("mousemove",
c,null)};document.addEventListener("mousemove",c,null)};SQR.Stringify={v2:function(a){return a.x+" | "+a.y},v3:function(a){return a.x+" | "+a.y+" | "+a.z},q:function(a){return a.w+" || "+a.x+" | "+a.y+" | "+a.z},m33:function(a){a=a.data||a;return a[0]+"\t|\t"+a[1]+"\t|\t"+a[2]+"\n"+a[3]+"\t|\t"+a[4]+"\t|\t"+a[5]+"\n"+a[6]+"\t|\t"+a[7]+"\t|\t"+a[8]+"\n"},m44:function(a){var c=a.data||a;a=function(a){a=Math.abs(c[a])>1.0E-4?c[a]:0;return a=a.toPrecision(3)};return a(0)+"\t|\t"+a(4)+"\t|\t"+a(8)+"\t|\t"+a(12)+"\n"+a(1)+"\t|\t"+a(5)+"\t|\t"+a(9)+"\t|\t"+a(13)+
"\n"+a(2)+"\t|\t"+a(6)+"\t|\t"+a(10)+"\t|\t"+a(14)+"\n"+a(3)+"\t|\t"+a(7)+"\t|\t"+a(11)+"\t|\t"+a(15)+"\n"}};SQR.Time={};SQR.Time.time=0;SQR.Time.startTime=0;SQR.Time.timeOffset=0;SQR.Time.lastTime=0;SQR.Time.deltaTime=0;SQR.Time.tick=function(){var a=(new Date).getTime();if(SQR.Time.startTime==0)SQR.Time.startTime=a;if(SQR.Time.lastTime!=0)SQR.Time.deltaTime=a-SQR.Time.lastTime;SQR.Time.lastTime=a;SQR.Time.time=(a-SQR.Time.startTime)/1E3;SQR.Time.deltaTime/=1E3};SQR.Time.getTime=function(){SQR.Time.tick();return SQR.Time.deltaTime};SQR.Time.pause=function(){SQR.Time.timeOffset=(new Date).getTime()};
SQR.Time.resume=function(){SQR.Time.startTime+=(new Date).getTime()-SQR.Time.timeOffset;SQR.Time.lastTime=SQR.Time.deltaTime=0};SQR.Time.formatTime=function(a,c){if(!a)a=SQR.Time.time;var b=Math.floor(a%1*100),d=Math.floor(a)%60,e=Math.floor(a/60);b<10&&(b="0"+b);b==100&&(b="00");d<10&&(d="0"+d);e<10&&(e="0"+e);return c?e+":"+d+":"+b:e+":"+d};
