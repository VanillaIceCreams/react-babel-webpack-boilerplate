
<p><strong>（1）为对象添加属性</strong></p>
<pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">class</span> <span class="token class-name">Point</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>x<span class="token punctuation">,</span> y<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//this.x=x;this.y=y</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre>
<p><strong>（2）克隆对象</strong></p>
<pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">function</span> <span class="token function">clone</span><span class="token punctuation">(</span>origin<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> origin<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
<p><strong>（3）合并对象</strong></p>
<pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">const</span> <span class="token function-variable function">merge</span> <span class="token operator">=</span>
  <span class="token punctuation">(</span><span class="token operator">...</span>sources<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token operator">...</span>sources<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<p><strong>（4）克隆并修改对象</strong></p>
<pre class=" language-javascript"><code class=" language-javascript">article <span class="token operator">=</span> <span class="token punctuation">{</span>
  title<span class="token punctuation">:</span> <span class="token string">'title1'</span><span class="token punctuation">,</span>
  content<span class="token punctuation">:</span> <span class="token string">'content1'</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> article2 <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> article<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  content<span class="token punctuation">:</span> <span class="token string">'content2'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>article2<span class="token punctuation">)</span><span class="token comment">//title: 'title1',content: 'content1'</span>
</code></pre>
<p><strong>（5）问题：只是浅拷贝，无法拷贝对象属性的引用（即只能拷贝一层）</strong></p>
<pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">const</span> defaultOpt <span class="token operator">=</span> <span class="token punctuation">{</span>
  title<span class="token punctuation">:</span> <span class="token punctuation">{</span>
    text<span class="token punctuation">:</span> <span class="token string">'hello world'</span><span class="token punctuation">,</span>
    subtext<span class="token punctuation">:</span> <span class="token string">'It\'s my world.'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> opt <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> defaultOpt<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  title<span class="token punctuation">:</span> <span class="token punctuation">{</span>
    subtext<span class="token punctuation">:</span> <span class="token string">'Yes, your world.'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>opt<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//subtext: 'Yes, your world.' ；丢失了text属性</span>
</code></pre>
<h2 id="object-getprototypeof-">Object.getPrototypeOf()</h2>
<p><strong>（1）为 对象 添加 全局方法/变量</strong></p>
<pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">class</span> <span class="token class-name">People</span><span class="token punctuation">{</span>
    <span class="token comment">//...</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> p1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">People</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> p2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">People</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
Object<span class="token punctuation">.</span><span class="token function">getPrototypeOf</span><span class="token punctuation">(</span>p1<span class="token punctuation">)</span><span class="token punctuation">.</span>age<span class="token operator">=</span><span class="token number">25</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p1<span class="token punctuation">.</span>age<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//25</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p2<span class="token punctuation">.</span>age<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//也是25</span>
</code></pre>
<h2 id="-js-">浏览器加载js文件（新）</h2>
<pre class=" language-javascript"><code class=" language-javascript"><span class="token operator">&lt;</span>script src<span class="token operator">=</span><span class="token string">"path/to/myModule.js"</span> defer<span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span><span class="token comment">//渲染完页面再执行</span>
<span class="token operator">&lt;</span>script src<span class="token operator">=</span><span class="token string">"path/to/myModule.js"</span> <span class="token keyword">async</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span><span class="token comment">//下载完js文件就执行</span>
<span class="token operator">&lt;</span>script type<span class="token operator">=</span><span class="token string">"module"</span> src<span class="token operator">=</span><span class="token string">"./foo.js"</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span><span class="token comment">//渲染完页面后加载ES6模块</span>
</code></pre>
<h2 id="promise">Promise</h2>
<blockquote>
<p>1.调用judge返回一个Promise对象</p>
<p>2.调用Promise的then方法，成功则调用resolve(attr)</p>
<p>3.将attr传给value，然后进行操作</p>
</blockquote>
<pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">function</span> <span class="token function">judge</span><span class="token punctuation">(</span>flag<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>flag<span class="token punctuation">)</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">"success"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">else</span> <span class="token function">reject</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">'failed '</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">judge</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//"success"</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">judge</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// Unhandled promise rejection (rejection id: 2): Error: failed</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
