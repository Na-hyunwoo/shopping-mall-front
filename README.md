# 간단한 쇼핑물 구현

## 개요

- **쇼핑 목록을 보여주는 간단한 웹 앱입니다.**

## 기술 스택
- Typescript, React, axios, Recoil, styled-components

## 특징

- **Intersection Observer API** 

  - 무한 스크롤을 구현하기 위해 Intersection Observer API를 사용했습니다. 

  - 일반적인 scroll event + throttle + requestAnimationFrame 으로 구성하게되면

  - 리플로우에 의한 렌더링 성능 저하 등의 문제가 발생하기 때문에 이를 해결하기 위함이었습니다. 

- **grid 속성 사용** 

- **filter 클릭시 query값 변경**

- **반응형 디자인 구현**

## 시작하기 

1. npm install
2. npm start

## 결과물
https://user-images.githubusercontent.com/22545843/206652371-2f3ad81b-8995-408d-84b0-f02a2e71a3a2.mov

## 트러블 슈팅 

일반적으로 무한 스크롤을 구현하기 위해 scroll을 감지해서 scroll이 바닥에 닿을 때 쯤에 api를 fetch하는 방식을 사용한다.

그러나, 이렇게 했을 때의 문제는 scroll을 계속해서 감지한다는 것 자체가 브라우저에 엄청난 부담을 준다는 것이다. 

그 부담을 덜어내기 위해서 throttle을 사용하고, requestAnimationFrame API를 사용해서 프레임을 맞춰, 버벅임이 없게 할 수 있다. 

그러나, 이렇게 최적화를 해도 충분하지 않다는 생각이 들었고, 자료 조사를 한 끝에 **Intersection Observer API**라는 것을 발견했다. 

원리는 간단하다. 사용자의 화면에 보이는 viewport와 내가 지정한 div가 Intersection을 하는 지점에서 callback 함수를 실행하는 것이다. 

그래서 나는 처음에, 쇼핑 목록 list 중 가장 마지막 요소에 ref를 건 뒤에, ref가 30%정도 보이는 시점에서 api를 fetch하는 방식을 사용했다. 

그런데, 여기서 문제가 발생했는데, **ref의 경우 상태 추적이 안되기 때문에 fetch한 데이터를 반영해도 side effect가 발생하지 않는다는 것이었다.**

그래서, 최초에 ref로 지정된 녀석이 계속해서 ref인 상태로 남게 되었고, 따라서, 최초에 지정된 ref요소를 지나칠 때마다 api가 fetch 되었다. 

그래서, 이를 어떻게 해결할 수 있을까 생각해보다. **Mocking한 div를 ref로 지정해주면 좋겠다는 생각을 하였다.** 그러면, ref를 바꾸지 않아도 계속해서 재사용이 가능했다. 

코드는 다음과 같다. (MockElement라는 div에 ref를 걸었다.)

```js
<>
  <ProductListWrapper>
    {newestProducts.data.map((product, index) => (
      <ProductItem 
        ...props
      />
    ))}
    <MockElement ref={ref}/>
  </ProductListWrapper>
</>
```

Intersection Observer API와 관련된 부분은 다음과 같다.

```js
const option = {
  root: null,
  rootMargin: '0px',
  threshold: 0.01
};

const callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
  entries.forEach(async (entry) => {
    if (entry.isIntersecting) await updatePopularProducts();
  })
};

useEffect(() => {
  if (!ref.current) return;

  const observer = new IntersectionObserver(callback, option);
  observer.observe(ref.current);

  return () => observer.disconnect()
}, []);
```

이는 사실 내가 생각한 것은 아니고, [zum 페이지](https://start.zum.com/popularity)가 이렇게 구현을 했다. 

이렇게 Intersection Observer API를 통하면 scroll을 감지하지 않고도 아주 좋은 성능으로 api를 fetch할 수 있다. 뿌듯하다 !
