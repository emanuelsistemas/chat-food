export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Verificar se é uma solicitação para a API
    const isApi = url.pathname.startsWith('/api');
    
    // Definir o destino com base no caminho
    const target = isApi 
      ? 'http://147.93.32.27:5000' 
      : 'http://147.93.32.27:80';
    
    // Construir o URL completo de destino
    const targetUrl = new URL(url.pathname, target);
    targetUrl.search = url.search;
    
    // Clone the request headers
    const headers = new Headers(request.headers);
    
    // Adicionar ou substituir cabeçalhos importantes
    headers.set('Host', new URL(target).host);
    headers.set('X-Forwarded-Host', 'chatfood.appbr.io');
    headers.set('X-Forwarded-Proto', 'https');
    headers.set('X-Original-URL', request.url);
    
    // Copiar o cabeçalho CF-Connecting-IP se existir
    const cfConnectingIp = request.headers.get('CF-Connecting-IP');
    if (cfConnectingIp) {
      headers.set('X-Forwarded-For', cfConnectingIp);
      headers.set('X-Real-IP', cfConnectingIp);
    }
    
    // Criar uma nova solicitação com os cabeçalhos modificados
    const modifiedRequest = new Request(targetUrl.toString(), {
      method: request.method,
      headers: headers,
      body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
      redirect: 'manual'
    });
    
    try {
      console.log(`Encaminhando requisição para: ${targetUrl.toString()}`);
      
      // Fazer a solicitação para o destino
      const response = await fetch(modifiedRequest);
      
      // Criar uma nova resposta
      const newHeaders = new Headers(response.headers);
      
      // Adicionar cabeçalhos CORS à resposta
      newHeaders.set('Access-Control-Allow-Origin', '*');
      newHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      newHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
      // Adicionar cabeçalhos de debug
      newHeaders.set('X-Debug-Original-URL', request.url);
      newHeaders.set('X-Debug-Target-URL', targetUrl.toString());
      newHeaders.set('X-Debug-Is-API', isApi ? 'true' : 'false');
      
      const newResponse = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders
      });
      
      return newResponse;
    } catch (error) {
      console.error(`Erro ao encaminhar requisição: ${error.message}`);
      return new Response(`Erro ao processar a requisição: ${error.message}\n\nURL Original: ${request.url}\nURL Destino: ${targetUrl.toString()}\nÉ API: ${isApi ? 'Sim' : 'Não'}`, { 
        status: 500,
        headers: {
          'Content-Type': 'text/plain',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
  }
}
