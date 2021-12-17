package aop;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;
import org.springframework.util.StopWatch;


@Aspect
@Component

public class LoggingAspect {
	
private static final Logger LOGGER = LogManager.getLogger(LoggingAspect.class);
    
  
    @Around("execution(* com.expenseapp.expenseapp.service..*(..)))")
    public Object logMethodExecutionTime(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        MethodSignature methodSignature = (MethodSignature) proceedingJoinPoint.getSignature();

        final StopWatch stopWatch = new StopWatch();

        //calculate method execution time
        stopWatch.start();
        Object result = proceedingJoinPoint.proceed();
        stopWatch.stop();

        //Log method execution time
        LOGGER.info("EXPENSE - Spring Boot Logging AOP EXAMPLE - Execution time of "
                + methodSignature.getDeclaringType().getSimpleName() 
                + "." + methodSignature.getName() + " " 
                + ":: " + stopWatch.getTotalTimeMillis() + " ms");

        return result;
    }
}
